import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect, useCallback } from 'react';

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

      const data = await response.json();

      // Handle model still loading (503)
      if (response.status === 503 && data.status === 'loading') {
        setTranscript(data.text || '⏳ النموذج قيد التحميل... يرجى الانتظار.');
        setStatus('error');
        return;
      }

      if (!response.ok) throw new Error('Server error');

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
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden p-8">
      {/* Ambient background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full blur-[80px] opacity-30 w-[400px] h-[400px] bg-[#7c3aed] -top-[100px] -right-[100px] animate-orbFloat1" />
        <div className="absolute rounded-full blur-[80px] opacity-30 w-[300px] h-[300px] bg-[#a78bfa] -bottom-[50px] -left-[80px] animate-orbFloat2" />
        <div className="absolute rounded-full blur-[80px] opacity-30 w-[200px] h-[200px] bg-[#c084fc] top-[40%] left-1/2 animate-orbFloat3" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 py-5 px-8 z-10 flex justify-start animate-fadeInDown">
        <button 
          className="flex items-center gap-2 py-2.5 px-5 bg-surface-glass backdrop-blur-[12px] border border-border rounded-full text-text-secondary text-[0.95rem] font-medium transition-all duration-300 ease-out hover:text-text-primary hover:border-primary-light hover:bg-surface-glass-hover hover:translate-x-1" 
          onClick={() => navigate('/')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
          الرئيسية
        </button>
      </nav>

      <div className="relative z-[1] flex flex-col items-center gap-8 max-w-[700px] w-full">
        <h1 className="font-primary text-[1.4rem] md:text-[1.8rem] font-bold text-text-primary text-center animate-fadeInUp">
          {status === 'idle' && 'اضغط للبدء بالتسجيل'}
          {status === 'recording' && 'جارٍ التسجيل...'}
          {status === 'processing' && 'جارٍ المعالجة...'}
          {status === 'done' && 'تم التحويل بنجاح!'}
          {status === 'error' && 'حدث خطأ'}
        </h1>

        {/* Microphone button */}
        <div className="relative flex items-center justify-center w-[150px] md:w-[180px] h-[150px] md:h-[180px] animate-scaleIn [animation-delay:200ms]">
          {status === 'recording' && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-[#ef444466] z-[1] animate-ripple1" />
              <div className="absolute inset-0 rounded-full border-2 border-[#ef444466] z-[1] animate-ripple2" />
              <div className="absolute inset-0 rounded-full border-2 border-[#ef444466] z-[1] animate-ripple3" />
            </>
          )}
          <button
            id="btn-mic"
            className={`
              w-[100px] md:w-[120px] h-[100px] md:h-[120px] rounded-full flex items-center justify-center border-none text-white relative z-[2] transition-all duration-400 ease-out disabled:opacity-60 disabled:cursor-not-allowed
              ${status === 'recording' 
                ? 'bg-[linear-gradient(135deg,#ef4444,#f97316)] shadow-[0_8px_35px_rgba(239,68,68,0.5)] hover:shadow-[0_12px_40px_rgba(239,68,68,0.6)]' 
                : 'bg-gradient-primary bg-[length:200%_200%] shadow-[0_8px_30px_rgba(139,92,246,0.5)] hover:scale-105 hover:shadow-[0_12px_40px_rgba(139,92,246,0.6)]'
              }
            `}
            onClick={status === 'recording' ? stopRecording : startRecording}
            disabled={status === 'processing'}
            style={status === 'recording' ? { transform: `scale(${1 + audioLevel * 0.15})` } : {}}
          >
            {status === 'processing' ? (
              <div className="w-9 h-9 border-[3px] border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <svg className="w-8 md:w-10 h-8 md:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          <div className="flex items-center gap-[10px] font-mono text-2xl text-text-primary tracking-[3px] animate-fadeIn">
            <div className={`w-[10px] h-[10px] rounded-full bg-[#ef4444] ${status === 'recording' ? 'animate-pulseCustom' : ''}`} />
            <span>{formatTime(recordingTime)}</span>
          </div>
        )}

        {/* Audio visualizer bars */}
        {status === 'recording' && (
          <div className="flex items-center justify-center gap-[3px] h-[60px] w-full max-w-[500px] animate-fadeIn">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-primary rounded-[2px] min-h-1 animate-vizPulse"
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
          <div className={`w-full p-8 text-center animate-scaleIn glass-card ${status === 'error' ? 'border-[#ef44444d]' : ''}`}>
            <div className="flex items-center justify-center gap-[10px] mb-6">
              <span className="text-2xl">
                {status === 'done' ? '✅' : '⚠️'}
              </span>
              <span className="font-primary text-[1.1rem] font-semibold text-text-secondary">
                {status === 'done' ? 'النص المُستخرج' : 'رسالة الخطأ'}
              </span>
            </div>
            <p className="text-[1.1rem] md:text-[1.35rem] font-semibold text-text-primary leading-loose p-6 bg-[#8b5cf60f] rounded-2xl border border-[#8b5cf61a] mb-6 min-h-[80px]">{transcript}</p>
            <button className="btn-primary mx-auto" onClick={resetRecording}>
              🎙️ تسجيل جديد
            </button>
          </div>
        )}

        {/* Hint text */}
        {status === 'idle' && (
          <p className="text-text-muted text-base text-center animate-fadeIn [animation-delay:400ms]">
            اضغط على زر الميكروفون ثم تحدث بوضوح باللغة العربية
          </p>
        )}
      </div>
    </div>
  );
}

export default RecordPage;
