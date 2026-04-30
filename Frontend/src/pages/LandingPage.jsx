import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function LandingPage() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const baseAnim = `transition-all duration-800 ease-out ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0515]">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/background.jpg" 
          alt="" 
          aria-hidden="true" 
          className="w-full h-full object-cover brightness-[0.35] saturate-[1.3] scale-[1.05] animate-slowZoom"
        />
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(10, 5, 21, 0.6) 0%, rgba(10, 5, 21, 0.3) 40%, rgba(10, 5, 21, 0.5) 70%, rgba(10, 5, 21, 0.9) 100%)' }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-primary-light rounded-full opacity-0 animate-particleFloat"
            style={{
              '--delay': `${Math.random() * 6}s`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              '--duration': `${Math.random() * 10 + 8}s`,
            }}
          />
        ))}
      </div>

      {/* Sound wave decorative bars */}
      <div className="absolute bottom-0 inset-x-0 h-[120px] flex items-end justify-center gap-1 z-10 opacity-15 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="w-[3px] bg-gradient-primary rounded-[3px] animate-soundWave"
            style={{ '--delay': `${i * 0.1}s` }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-20 text-center p-8 max-w-[800px]">
        {/* Arabic calligraphy-inspired logo */}
        <div className={`relative flex justify-center mb-8 ${baseAnim} delay-100`}>
          <div 
            className="absolute w-[120px] h-[120px] rounded-full animate-pulseCustom top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent 70%)' }}
          />
          <div className="w-[90px] h-[90px] relative animate-float">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="40" cy="40" r="38" stroke="url(#logoGrad)" strokeWidth="2" opacity="0.3"/>
              <path d="M40 15 C40 15, 48 15, 48 25 L48 42 C48 47, 44 50, 40 50 C36 50, 32 47, 32 42 L32 25 C32 15, 40 15, 40 15Z" fill="url(#logoGrad)"/>
              <path d="M26 38 L26 42 C26 50, 32 56, 40 56 C48 56, 54 50, 54 42 L54 38" stroke="url(#logoGrad)" strokeWidth="3" strokeLinecap="round"/>
              <line x1="40" y1="56" x2="40" y2="65" stroke="url(#logoGrad)" strokeWidth="3" strokeLinecap="round"/>
              <line x1="33" y1="65" x2="47" y2="65" stroke="url(#logoGrad)" strokeWidth="3" strokeLinecap="round"/>
              <defs>
                <linearGradient id="logoGrad" x1="20" y1="15" x2="60" y2="65">
                  <stop offset="0%" stopColor="#a78bfa"/>
                  <stop offset="100%" stopColor="#c084fc"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <h1 className={`font-primary mb-6 leading-snug ${baseAnim} delay-300`}>
          <span className="block text-[1.2rem] md:text-[1.6rem] font-normal text-text-secondary tracking-[2px]">نظام التعرّف على</span>
          <span className="block text-[2.5rem] md:text-[3.5rem] font-black mt-1">
            <span className="bg-gradient-primary bg-[length:200%_200%] bg-clip-text text-transparent animate-gradientShiftSlow">الكلام العربي</span>
          </span>
        </h1>

        <p className={`text-[1rem] md:text-[1.15rem] text-text-secondary mb-10 leading-loose ${baseAnim} delay-500`}>
          تقنية ذكاء اصطناعي متقدمة لتحويل الكلام العربي إلى نص مكتوب
          <br />
          <span className="text-accent font-medium text-[0.95rem]">يعتمد على نموذج Wav2Vec2 </span>
        </p>

        {/* Action buttons */}
        <div className={`flex flex-col md:flex-row gap-5 justify-center flex-wrap items-center mb-12 ${baseAnim} delay-700`}>
          <button
            id="btn-start-recording"
            className="btn-primary min-w-[200px] w-full md:w-auto max-w-[300px] md:max-w-none"
            onClick={() => navigate('/record')}
          >
            <span className="text-[1.3rem]">🎙️</span>
            ابدأ تسجيل
          </button>
          <button
            id="btn-explore-more"
            className="btn-secondary min-w-[200px] w-full md:w-auto max-w-[300px] md:max-w-none"
            onClick={() => navigate('/about')}
          >
            <span className="text-[1.3rem]">✨</span>
            استكشف المزيد
          </button>
        </div>

        {/* Feature badges */}
        {/* <div className={`flex flex-col md:flex-row gap-4 justify-center items-center flex-wrap ${baseAnim} delay-[900ms]`}>
          <div className="flex items-center gap-2 px-5 py-2.5 text-[0.9rem] font-medium text-text-secondary rounded-full glass-card">
            <span className="text-[1.1rem]">⚡</span>
            <span>تحويل فوري</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 text-[0.9rem] font-medium text-text-secondary rounded-full glass-card">
            <span className="text-[1.1rem]">🎯</span>
            <span>دقة عالية</span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 text-[0.9rem] font-medium text-text-secondary rounded-full glass-card">
            <span className="text-[1.1rem]">🌍</span>
            <span>لهجات متعددة</span>
          </div>
        </div> */}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-fadeIn [animation-delay:1.5s] [animation-fill-mode:both]">
        <div className="w-[26px] h-[40px] border-2 border-border rounded-[13px] flex justify-center pt-2">
          <div className="w-[3px] h-[8px] bg-primary-light rounded-[3px] animate-scrollDot" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
