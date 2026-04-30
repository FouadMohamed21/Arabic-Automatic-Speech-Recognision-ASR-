
import logging
import os
import subprocess
import tempfile
import warnings

# ── Silence HuggingFace / transformers warnings BEFORE any imports ──
# These env vars must be set before the libraries are imported.
os.environ["TRANSFORMERS_VERBOSITY"] = "error"
os.environ["HF_HUB_VERBOSITY"] = "error"
os.environ["TRANSFORMERS_NO_ADVISORY_WARNINGS"] = "1"
os.environ["HF_HUB_DISABLE_TELEMETRY"] = "1"

# Suppress Python warnings module messages about unauthenticated requests
warnings.filterwarnings("ignore", message=".*unauthenticated requests.*")
warnings.filterwarnings("ignore", category=UserWarning)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Also suppress at the logging level
logging.getLogger("httpx").setLevel(logging.ERROR)
logging.getLogger("huggingface_hub").setLevel(logging.ERROR)
logging.getLogger("transformers").setLevel(logging.ERROR)

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import torch
import librosa
from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor

app = FastAPI(
    title="Arabic ASR API",
    description="نظام التعرّف التلقائي على الكلام العربي",
    version="1.0.0",
)

# CORS - allow frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
# Buckwalter → Arabic conversion
# (الموديل بيطلع النتائج بتنسيق Buckwalter Transliteration)
# ============================================================
BUCKWALTER_MAP = {
    "'": 'ء', '>': 'أ', '&': 'ؤ', '<': 'إ', '}': 'ئ', 'A': 'ا', 'b': 'ب', 'p': 'ة', 't': 'ت', 'v': 'ث',
    'j': 'ج', 'H': 'ح', 'x': 'خ', 'd': 'د', '*': 'ذ', 'r': 'ر', 'z': 'ز', 's': 'س', '$': 'ش', 'S': 'ص',
    'D': 'ض', 'T': 'ط', 'Z': 'ظ', 'E': 'ع', 'g': 'غ', '_': 'ـ', 'f': 'ف', 'q': 'ق', 'k': 'ك', 'l': 'ل',
    'm': 'م', 'n': 'ن', 'h': 'ه', 'w': 'و', 'Y': 'ى', 'y': 'ي', 'F': 'ً', 'N': 'ٌ', 'K': 'ٍ', 'a': 'َ',
    'u': 'ُ', 'i': 'ِ', '~': 'ّ', 'o': 'ْ', '`': 'ٰ', '{': 'ٱ', '/': ' '
}


def buckwalter_to_arabic(text: str) -> str:
    """تحويل نص Buckwalter إلى لغة عربية مفهومة."""
    text = text.replace('/', ' ')
    for bw_char, ar_char in BUCKWALTER_MAP.items():
        text = text.replace(bw_char, ar_char)
    return text


# ============================================================
# Model Loading (wav2vec2-large-xlsr-53-arabic)
# ============================================================
MODEL_ID = "elgeish/wav2vec2-large-xlsr-53-arabic"
processor = None
model = None
model_loading = False  # True while model is downloading/loading


def _load_model_sync():
    """Load model in a background thread so the server stays responsive."""
    global processor, model, model_loading
    model_loading = True
    try:
        logger.info(f"Loading model: {MODEL_ID} ...")
        processor = Wav2Vec2Processor.from_pretrained(MODEL_ID)
        model = Wav2Vec2ForCTC.from_pretrained(MODEL_ID)
        model.eval()  # set to evaluation mode
        logger.info("✅ Model loaded successfully!")
    except Exception as e:
        logger.error(f"❌ Failed to load model: {e}")
        logger.warning("Server will run but transcription will return placeholder text.")
    finally:
        model_loading = False


@app.on_event("startup")
async def load_model():
    """Start model loading in a background thread."""
    import threading
    thread = threading.Thread(target=_load_model_sync, daemon=True)
    thread.start()


def convert_to_wav(input_path: str) -> str:
    """
    Convert any audio file to 16kHz mono WAV using ffmpeg.
    Browser recordings are typically webm which librosa can't read directly.
    """
    wav_path = input_path.rsplit('.', 1)[0] + '_converted.wav'
    
    import shutil
    # Use shutil.which first, fallback to the absolute path where winget installed it
    ffmpeg_cmd = shutil.which('ffmpeg') or r"C:\Users\omarL\AppData\Local\Microsoft\WinGet\Links\ffmpeg.exe"
    
    try:
        cmd = [
            ffmpeg_cmd, '-y', '-i', input_path,
            '-ar', '16000',      # 16kHz sample rate (required by wav2vec2)
            '-ac', '1',          # mono channel
            '-sample_fmt', 's16', # 16-bit PCM
            wav_path
        ]
        result = subprocess.run(
            cmd, capture_output=True, text=True, timeout=30
        )
        if result.returncode != 0:
            logger.error(f"ffmpeg error: {result.stderr}")
            raise RuntimeError(f"ffmpeg conversion failed: {result.stderr}")
        logger.info(f"Converted {input_path} -> {wav_path}")
        return wav_path
    except FileNotFoundError:
        raise RuntimeError("ffmpeg is not installed or could not be found.")


def transcribe_audio(file_path: str) -> str:
    """
    Transcribe an audio file to Arabic text using wav2vec2.

    Args:
        file_path: Path to the audio file.

    Returns:
        Transcribed text string in Arabic.
    """
    if model is None or processor is None:
        return "⚠️ النموذج غير محمّل بعد — يرجى الانتظار حتى يتم تحميل النموذج."

    # Convert to WAV first (browser sends webm which librosa can't read)
    wav_path = None
    try:
        wav_path = convert_to_wav(file_path)
        # 1. Load audio at 16kHz (as required by wav2vec2 - Paper 2)
        speech, samplerate = librosa.load(wav_path, sr=16000)
        logger.info(f"Audio loaded: {len(speech)} samples, {len(speech)/16000:.2f}s duration")

        # 2. Convert audio to input tensors
        inputs = processor(speech, return_tensors="pt", sampling_rate=16000)
        input_values = inputs.input_values

        # 3. Forward pass (inference)
        with torch.no_grad():
            logits = model(input_values).logits

        # 4. CTC Decoding (Argmax)
        predicted_ids = torch.argmax(logits, dim=-1)

        # 5. Decode IDs to text (Buckwalter format)
        raw_transcription = processor.batch_decode(predicted_ids)[0]
        logger.info(f"Raw transcription (Buckwalter): {raw_transcription}")

        # 6. Convert Buckwalter → Arabic
        arabic_transcription = buckwalter_to_arabic(raw_transcription)

        return arabic_transcription
    finally:
        # Clean up converted wav file
        if wav_path and os.path.exists(wav_path):
            os.remove(wav_path)


# ============================================================
# API Routes
# ============================================================

@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "status": "running",
        "message": "Arabic ASR API is online",
        "model_loaded": model is not None,
        "model_loading": model_loading,
    }


@app.post("/api/transcribe")
async def transcribe(audio: UploadFile = File(...)):
    """
    Receive an audio file and return the transcribed Arabic text.

    Accepts audio files (webm, wav, mp3, ogg, flac, m4a).
    Returns JSON with the transcribed text.
    """
    # Return friendly message if model is still downloading
    if model_loading:
        return JSONResponse(
            status_code=503,
            content={
                "text": "⏳ النموذج قيد التحميل حالياً... يرجى الانتظار قليلاً ثم المحاولة مرة أخرى.",
                "status": "loading",
            }
        )
    # Validate file type
    allowed_types = [
        "audio/webm", "audio/wav", "audio/wave", "audio/x-wav",
        "audio/mp3", "audio/mpeg", "audio/ogg", "audio/flac",
        "audio/mp4", "audio/m4a", "audio/x-m4a",
        "video/webm",
    ]

    content_type = audio.content_type or ""
    if content_type and content_type not in allowed_types:
        logger.warning(f"Rejected file with content type: {content_type}")
        raise HTTPException(
            status_code=400,
            detail=f"نوع الملف غير مدعوم: {content_type}. الأنواع المدعومة: webm, wav, mp3, ogg, flac, m4a"
        )

    # Save uploaded file temporarily
    suffix = ".webm"
    if "wav" in content_type:
        suffix = ".wav"
    elif "mp3" in content_type or "mpeg" in content_type:
        suffix = ".mp3"
    elif "ogg" in content_type:
        suffix = ".ogg"
    elif "flac" in content_type:
        suffix = ".flac"
    elif "m4a" in content_type or "mp4" in content_type:
        suffix = ".m4a"

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            content = await audio.read()
            tmp.write(content)
            tmp_path = tmp.name
            logger.info(f"Saved audio file: {tmp_path} ({len(content)} bytes)")

        # Transcribe
        text = transcribe_audio(tmp_path)
        logger.info(f"Transcription result: {text[:100]}...")

        return JSONResponse(content={
            "text": text,
            "status": "success",
        })

    except Exception as e:
        logger.error(f"Transcription error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"حدث خطأ أثناء معالجة الصوت: {str(e)}"
        )

    finally:
        # Clean up temp file
        if 'tmp_path' in locals() and os.path.exists(tmp_path):
            os.remove(tmp_path)


@app.get("/api/health")
async def health_check():
    """Detailed health check."""
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "model_id": MODEL_ID,
        "endpoints": [
            {"path": "/", "method": "GET", "description": "Root health check"},
            {"path": "/api/transcribe", "method": "POST", "description": "Transcribe audio to text"},
            {"path": "/api/health", "method": "GET", "description": "Detailed health check"},
        ]
    }
