<div align="center">

# 🎙️ نظام التعرّف التلقائي على الكلام العربي

### Arabic Automatic Speech Recognition (ASR)

تحويل الكلام العربي إلى نص مكتوب باستخدام نموذج **Whisper** من OpenAI مع **Fine-Tuning** مخصص للغة العربية

[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Whisper](https://img.shields.io/badge/Whisper-OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://github.com/openai/whisper)

</div>

---

## 📖 نظرة عامة

مشروع أكاديمي يهدف إلى بناء نظام متقدم للتعرف التلقائي على الكلام العربي (ASR) باستخدام تقنيات التعلم العميق الحديثة. يعتمد النظام على نموذج **Whisper** من OpenAI مع **Fine-Tuning** مخصص لتحسين دقة التعرف على اللغة العربية ولهجاتها المتنوعة.

### ✨ المميزات الرئيسية

| الميزة | الوصف |
|--------|-------|
| 🧠 **نموذج Whisper** | Fine-tuning مخصص للغة العربية |
| ⚡ **تحويل فوري** | معالجة سريعة للصوت وتحويله لنص |
| 🎯 **دقة عالية** | تدريب على بيانات عربية متنوعة |
| 🌍 **دعم اللهجات** | يدعم الفصحى واللهجات العربية |
| 🔒 **خصوصية** | لا يتم تخزين التسجيلات بعد المعالجة |
| 📱 **تصميم متجاوب** | يعمل على جميع الأجهزة والشاشات |

---

## 🏗️ هيكل المشروع

```
📦 Arabic-ASR/
├── 📂 Frontend/              # واجهة المستخدم (React + Vite)
│   ├── 📂 public/
│   │   └── background.jpg    # صورة الخلفية
│   ├── 📂 src/
│   │   ├── 📂 pages/
│   │   │   ├── LandingPage.jsx   # صفحة الترحيب
│   │   │   ├── LandingPage.css
│   │   │   ├── RecordPage.jsx    # صفحة التسجيل
│   │   │   ├── RecordPage.css
│   │   │   ├── AboutPage.jsx     # صفحة المعلومات
│   │   │   └── AboutPage.css
│   │   ├── App.jsx           # المكوّن الرئيسي + التوجيه
│   │   ├── main.jsx          # نقطة الدخول
│   │   └── index.css         # نظام التصميم العام
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── 📂 Backend/               # الخادم الخلفي (FastAPI + Python)
│   ├── main.py               # خادم API + نقاط النهاية
│   └── requirements.txt      # المكتبات المطلوبة
│
├── 📂 doc/                   # مستندات المشروع
├── background.jpg            # صورة الخلفية الأصلية
└── README.md                 # هذا الملف
```

---

## 🛠️ التقنيات المستخدمة

### Frontend
- **React 19** — مكتبة واجهة المستخدم
- **Vite** — أداة البناء والتطوير السريع
- **React Router** — التوجيه بين الصفحات
- **CSS3** — تصميم متقدم مع Glassmorphism و CSS Animations
- **Web Audio API** — تسجيل الصوت ومراقبة مستوى الصوت

### Backend
- **Python 3.10+** — لغة البرمجة
- **FastAPI** — إطار الخادم الخلفي السريع
- **Uvicorn** — خادم ASGI عالي الأداء
- **OpenAI Whisper** — نموذج التعرف على الكلام *(يُضاف لاحقاً)*
- **PyTorch** — إطار التعلم العميق *(يُضاف لاحقاً)*
- **HuggingFace Transformers** — منصة النماذج *(اختياري)*

---

## 🚀 التشغيل

### المتطلبات الأساسية

- [Node.js](https://nodejs.org/) (الإصدار 18 أو أحدث)
- [Python](https://python.org/) (الإصدار 3.10 أو أحدث)
- [Git](https://git-scm.com/)

### 1️⃣ تنصيب و تشغيل الـ Frontend

```bash
# الدخول لمجلد الفرونت إند
cd Frontend

# تنصيب المكتبات
npm install

# تشغيل خادم التطوير
npm run dev
```

> سيعمل على: **http://localhost:5173**

### 2️⃣ تنصيب و تشغيل الـ Backend

```bash
# الدخول لمجلد الباك إند
cd Backend

# تنصيب المكتبات (يُفضل داخل بيئة افتراضية)
pip install -r requirements.txt

# تشغيل الخادم
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

> سيعمل على: **http://localhost:8000**

### 3️⃣ (اختياري) إنشاء بيئة افتراضية

```bash
# إنشاء بيئة افتراضية
python -m venv venv

# تفعيل البيئة (Windows)
venv\Scripts\activate

# تفعيل البيئة (macOS/Linux)
source venv/bin/activate

# ثم تنصيب المكتبات
pip install -r requirements.txt
```

---

## 📄 الصفحات

### 🏠 صفحة الترحيب (`/`)
- خلفية متحركة مع صورة ميكروفون
- جزيئات متطايرة (Particles) وأشرطة صوتية
- زرارين رئيسيين:
  - **"ابدأ تسجيل"** → ينقلك لصفحة التسجيل
  - **"استكشف المزيد"** → ينقلك لصفحة المعلومات
- شارات المميزات (تحويل فوري، دقة عالية، لهجات متعددة)

### 🎙️ صفحة التسجيل (`/record`)
- زر ميكروفون تفاعلي مع تأثيرات Ripple
- مؤقت زمني للتسجيل
- شريط مرئي لمستوى الصوت (Audio Visualizer)
- إرسال تلقائي للخادم بعد إيقاف التسجيل
- عرض النص المُستخرج في بطاقة أنيقة
- معالجة الأخطاء (مثل رفض إذن الميكروفون)

### ℹ️ صفحة المعلومات (`/about`)
- شرح المشروع والهدف منه
- قسم "كيف يعمل النظام" (3 خطوات)
- شبكة المميزات (6 بطاقات)
- التقنيات المستخدمة
- زر CTA للانتقال للتسجيل

---

## 🔌 نقاط النهاية (API Endpoints)

| الطريقة | المسار | الوصف |
|---------|--------|-------|
| `GET` | `/` | فحص حالة الخادم |
| `POST` | `/api/transcribe` | تحويل ملف صوتي إلى نص |
| `GET` | `/api/health` | فحص صحة الخادم التفصيلي |

### مثال استخدام API

```bash
# فحص حالة الخادم
curl http://localhost:8000/

# إرسال ملف صوتي للتحويل
curl -X POST http://localhost:8000/api/transcribe \
  -F "audio=@recording.webm"
```

### صيغ الصوت المدعومة
`webm` • `wav` • `mp3` • `ogg` • `flac` • `m4a`

---

## 🧩 إضافة نموذج Whisper

عند جاهزية النموذج، عدّل ملف `Backend/main.py`:

```python
# === الخطوة 1: تنصيب المكتبات ===
# pip install openai-whisper torch

# === الخطوة 2: تحميل النموذج ===
import whisper
model = whisper.load_model("your-fine-tuned-model")  # أو مسار النموذج المحلي

# === الخطوة 3: تعديل دالة التحويل ===
def transcribe_audio(file_path: str) -> str:
    result = model.transcribe(file_path, language="ar")
    return result["text"]
```

أو باستخدام **HuggingFace Transformers**:

```python
from transformers import WhisperProcessor, WhisperForConditionalGeneration
import librosa

processor = WhisperProcessor.from_pretrained("your-model-name")
model = WhisperForConditionalGeneration.from_pretrained("your-model-name")

def transcribe_audio(file_path: str) -> str:
    audio, sr = librosa.load(file_path, sr=16000)
    input_features = processor(audio, sampling_rate=sr, return_tensors="pt").input_features
    predicted_ids = model.generate(input_features, language="ar")
    return processor.batch_decode(predicted_ids, skip_special_tokens=True)[0]
```

---

## 🔧 ملاحظات التطوير

- الـ Frontend يعمل على **port 5173** والـ Backend على **port 8000**
- CORS مفعّل للسماح بالتواصل بين الاتنين
- الملفات الصوتية المُرسلة تُحذف تلقائياً بعد المعالجة
- حالياً الـ Backend يرجع **نص تجريبي** لحد ما يتم تحميل النموذج
- عند الـ Production، غيّر إعدادات CORS لتقبل فقط الـ frontend URL

---

## 📋 خطوات التطوير القادمة

- [ ] تحميل وربط نموذج Whisper المُعدّل
- [ ] اختبار التحويل مع تسجيلات حقيقية
- [ ] تحسين أداء النموذج وسرعة الاستجابة
- [ ] إضافة دعم رفع ملفات صوتية مباشرة
- [ ] نشر المشروع (Deployment) على سيرفر

---

<div align="center">

**مشروع التعرّف على الكلام العربي** • معالجة الكلام • 2026

</div>
