import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect, useCallback } from 'react';
import './RecordPage.css';

function RecordPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle'); // idle | recording | processing | done | error
  const [transcript, setTranscript] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const analyserRef = useRef(null);
  const animFrameRef = useRef(null);
  const streamRef = useRef(null);

  const cleanupAudio = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  }, []);

  useEffect(() => {
    return cleanupAudio;
  }, [cleanupAudio]);

  const monitorAudioLevel = (stream) => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    analyserRef.current = analyser;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const update = () => {
      analyser.getByteFrequencyData(dataArray);
      const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
      setAudioLevel(avg / 128); // normalize to 0-2 range
      animFrameRef.current = requestAnimationFrame(update);
    };
    update();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        cleanupAudio();
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await sendAudio(audioBlob);
      };

      mediaRecorder.start();
      setStatus('recording');
      setRecordingTime(0);
      setTranscript('');

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      monitorAudioLevel(stream);
    } catch (err) {
      console.error('Microphone access denied:', err);
      setStatus('error');
      setTranscript('لم يتم السماح بالوصول إلى الميكروفون. يرجى تفعيل الإذن والمحاولة مرة أخرى.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setStatus('processing');
    }
  };

  const sendAudio = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');

      const response = await fetch('http://localhost:8000/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Server error');

      const data = await response.json();
      setTranscript(data.text || 'لم يتم التعرف على أي كلام.');
      setStatus('done');
    } catch (err) {
      console.error('Transcription failed:', err);
      setTranscript('حدث خطأ أثناء معالجة الصوت. تأكد من تشغيل الخادم.');
      setStatus('error');
    }
  };

  const resetRecording = () => {
    setStatus('idle');
    setTranscript('');
    setRecordingTime(0);
    setAudioLevel(0);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="record-page">
      {/* Ambient background */}
      <div className="record-bg">
        <div className="ambient-orb orb-1" />
        <div className="ambient-orb orb-2" />
        <div className="ambient-orb orb-3" />
      </div>

      {/* Navigation */}
      <nav className="record-nav">
        <button className="nav-back" onClick={() => navigate('/')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
          الرئيسية
        </button>
      </nav>

      <div className="record-container">
        <h1 className="record-title">
          {status === 'idle' && 'اضغط للبدء بالتسجيل'}
          {status === 'recording' && 'جارٍ التسجيل...'}
          {status === 'processing' && 'جارٍ المعالجة...'}
          {status === 'done' && 'تم التحويل بنجاح!'}
          {status === 'error' && 'حدث خطأ'}
        </h1>

        {/* Microphone button */}
        <div className="mic-container">
          {status === 'recording' && (
            <>
              <div className="mic-ripple ripple-1" />
              <div className="mic-ripple ripple-2" />
              <div className="mic-ripple ripple-3" />
            </>
          )}
          <button
            id="btn-mic"
            className={`mic-button ${status}`}
            onClick={status === 'recording' ? stopRecording : startRecording}
            disabled={status === 'processing'}
            style={status === 'recording' ? { '--audio-scale': 1 + audioLevel * 0.15 } : {}}
          >
            {status === 'processing' ? (
              <div className="spinner" />
            ) : (
              <svg className="mic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
                <line x1="8" y1="23" x2="16" y2="23"/>
              </svg>
            )}
          </button>
        </div>

        {/* Timer */}
        {(status === 'recording' || status === 'processing') && (
          <div className="timer">
            <div className={`timer-dot ${status === 'recording' ? 'active' : ''}`} />
            <span>{formatTime(recordingTime)}</span>
          </div>
        )}

        {/* Audio visualizer bars */}
        {status === 'recording' && (
          <div className="visualizer">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="viz-bar"
                style={{
                  '--i': i,
                  '--level': audioLevel,
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Result area */}
        {(status === 'done' || status === 'error') && (
          <div className={`result-card glass-card ${status}`}>
            <div className="result-header">
              <span className="result-icon">
                {status === 'done' ? '✅' : '⚠️'}
              </span>
              <span className="result-label">
                {status === 'done' ? 'النص المُستخرج' : 'رسالة الخطأ'}
              </span>
            </div>
            <p className="result-text">{transcript}</p>
            <button className="btn-primary result-retry" onClick={resetRecording}>
              🎙️ تسجيل جديد
            </button>
          </div>
        )}

        {/* Hint text */}
        {status === 'idle' && (
          <p className="record-hint">
            اضغط على زر الميكروفون ثم تحدث بوضوح باللغة العربية
          </p>
        )}
      </div>
    </div>
  );
}

export default RecordPage;
