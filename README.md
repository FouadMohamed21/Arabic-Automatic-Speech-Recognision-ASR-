<div align="center">

# 🎙️ Arabic Speech Recognition System

### Automatic Speech-to-Text for Arabic

Convert spoken Arabic into written text using a highly accurate deep learning model fine-tuned for the Arabic language.

[`https://python.org`](https://python.org)
[`https://react.dev`](https://react.dev)
[`https://fastapi.tiangolo.com`](https://fastapi.tiangolo.com)
[`https://tailwindcss.com`](https://tailwindcss.com)

</div>

---

## 📖 Overview

This academic project builds a modern **Arabic Automatic Speech Recognition (ASR)** system. It utilizes the `elgeish/wav2vec2-large-xlsr-53-arabic` model (based on Wav2Vec2) to provide fast and highly accurate speech-to-text conversion for the Arabic language and its dialects.

### ✨ Key Features

| Feature                           | Description                                        |
| --------------------------------- | -------------------------------------------------- |
| 🧠 **Wav2Vec2 Model**         | Fine‑tuned specifically for Arabic                 |
| ⚡ **Background Loading**      | Server stays responsive while the 1.26GB model loads |
| 🎯 **High Accuracy**         | Trained on diverse Arabic datasets                 |
| 🎨 **Tailwind CSS UI**        | Beautiful glassmorphism design and custom animations |
| 🔒 **Privacy First**         | No audio stored after processing                   |
| 📱 **Responsive Design**     | Works seamlessly across devices and screen sizes   |

---

## 🏗️ Project Structure

```
📦 Arabic-ASR/
├── 📂 Frontend/              # React + Vite + Tailwind CSS UI
│   ├── 📂 src/
│   │   ├── 📂 pages/         # Landing, Record, and About pages
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css         # Tailwind global styles
│   ├── package.json
│   ├── tailwind.config.js    # Tailwind v4 configuration
│   └── vite.config.js
│
├── 📂 Backend/               # FastAPI + Python
│   ├── main.py               # Core API & Model Inference
│   └── requirements.txt      # Python dependencies
│
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
- **React 19** & **Vite** — Fast, modern UI
- **Tailwind CSS v4** — Utility-first styling with complex custom animations
- **React Router** — Client-side navigation
- **Web Audio API** — Audio recording and visualizer integration

### Backend
- **Python 3.10+**
- **FastAPI** & **Uvicorn** — High-performance ASGI web framework
- **PyTorch** — Deep learning framework
- **HuggingFace Transformers** — Model loading and inference (`Wav2Vec2ForCTC`)
- **Librosa** & **FFmpeg** — Audio processing and format conversion

---

## 🚀 Getting Started

Follow these instructions to run the project locally.

### ⚠️ System Prerequisites
1. **Node.js (v18+)**
2. **Python (v3.10+)**
3. **FFmpeg** *(Required for audio conversion from browser `webm` to `wav`)*
   - **Windows:** Install via Winget: `winget install ffmpeg`
   - **macOS:** Install via Homebrew: `brew install ffmpeg`
   - **Linux:** Install via APT: `sudo apt install ffmpeg`
   - *Note: Make sure FFmpeg is in your system PATH!*

---

### 1️⃣ Run the Backend (FastAPI)

Open a terminal and navigate to the `Backend` directory:

```bash
cd Backend

# (Optional but recommended) Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate # macOS/Linux
`
# Install dependencies
pip install -r requirements.txt

# Start the server
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

> **Note on First Run:** The backend uses a 1.26GB AI model. It will automatically download on the first run. The server will start immediately in a "loading" state and will process requests once the background download completes.

---

### 2️⃣ Run the Frontend (React/Vite)

Open a **new** terminal and navigate to the `Frontend` directory:

```bash
cd Frontend

# Install Node dependencies
npm install

# Start the Vite development server
npm run dev
```

> **Access the App:** Open your browser and navigate to **http://localhost:5173**

---

## 🔌 API Endpoints

| Method   | Path                | Description            |
| -------- | ------------------- | ---------------------- |
| `GET`  | `/`               | Server status and model loading state |
| `POST` | `/api/transcribe` | Upload audio → Get Arabic text (Returns 503 if model is still loading) |
| `GET`  | `/api/health`     | Detailed server health check |

Supported audio formats: `webm`, `wav`, `mp3`, `ogg`, `flac`, `m4a`

---

## 🔧 Development Notes

- **CORS:** Enabled for all origins by default. Restrict `allow_origins` in `main.py` for production.
- **Temporary Files:** Uploaded audio files are automatically deleted from the server immediately after processing.
- **Log Suppression:** Noisy HuggingFace telemetry and download logs are suppressed by default in `main.py` for a cleaner terminal experience.

---

<div align="center">

**Arabic Speech Recognition Project • Speech Processing • 2026**

</div>
