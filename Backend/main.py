"""
Arabic ASR Backend Server
FastAPI server that receives audio recordings and returns transcribed Arabic text.
Uses OpenAI's Whisper model (fine-tuned for Arabic).
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import tempfile
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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
# Model Loading
# ============================================================
# TODO: Load your fine-tuned Whisper model here
# Example:
# import whisper
# model = whisper.load_model("your-fine-tuned-model-path")
#
# Or with transformers:
# from transformers import WhisperProcessor, WhisperForConditionalGeneration
# processor = WhisperProcessor.from_pretrained("your-model")
# model = WhisperForConditionalGeneration.from_pretrained("your-model")

model = None  # Placeholder until model is loaded


def transcribe_audio(file_path: str) -> str:
    """
    Transcribe an audio file to Arabic text using the Whisper model.
    
    Args:
        file_path: Path to the audio file.
    
    Returns:
        Transcribed text string.
    """
    if model is None:
        # Return a placeholder response when no model is loaded
        return "⚠️ النموذج غير محمّل بعد — هذا نص تجريبي. قم بتحميل نموذج Whisper لتفعيل التحويل الفعلي."
    
    # TODO: Implement actual transcription logic
    # Example with whisper:
    # result = model.transcribe(file_path, language="ar")
    # return result["text"]
    #
    # Example with transformers:
    # import librosa
    # audio, sr = librosa.load(file_path, sr=16000)
    # input_features = processor(audio, sampling_rate=sr, return_tensors="pt").input_features
    # predicted_ids = model.generate(input_features, language="ar")
    # transcription = processor.batch_decode(predicted_ids, skip_special_tokens=True)[0]
    # return transcription
    
    return ""


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
    }


@app.post("/api/transcribe")
async def transcribe(audio: UploadFile = File(...)):
    """
    Receive an audio file and return the transcribed Arabic text.
    
    Accepts audio files (webm, wav, mp3, ogg, flac, m4a).
    Returns JSON with the transcribed text.
    """
    # Validate file type
    allowed_types = [
        "audio/webm", "audio/wav", "audio/wave", "audio/x-wav",
        "audio/mp3", "audio/mpeg", "audio/ogg", "audio/flac",
        "audio/mp4", "audio/m4a", "audio/x-m4a",
        "video/webm",  # Chrome sometimes sends webm as video/webm
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
        "endpoints": [
            {"path": "/", "method": "GET", "description": "Root health check"},
            {"path": "/api/transcribe", "method": "POST", "description": "Transcribe audio to text"},
            {"path": "/api/health", "method": "GET", "description": "Detailed health check"},
        ]
    }
