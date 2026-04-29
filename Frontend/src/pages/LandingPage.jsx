import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing-page">
      {/* Background image with overlay */}
      <div className="landing-bg">
        <img src="/background.jpg" alt="" aria-hidden="true" />
        <div className="landing-bg-overlay" />
      </div>

      {/* Floating particles */}
      <div className="particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              '--delay': `${Math.random() * 6}s`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
              '--size': `${Math.random() * 4 + 2}px`,
              '--duration': `${Math.random() * 10 + 8}s`,
            }}
          />
        ))}
      </div>

      {/* Sound wave decorative bars */}
      <div className="sound-waves-bg">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="wave-bar"
            style={{ '--delay': `${i * 0.1}s` }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className={`landing-content ${loaded ? 'loaded' : ''}`}>
        {/* Arabic calligraphy-inspired logo */}
        <div className="logo-section">
          <div className="logo-glow" />
          <div className="logo-icon">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
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

        <h1 className="landing-title">
          <span className="title-line-1">نظام التعرّف على</span>
          <span className="title-line-2">
            <span className="gradient-text">الكلام العربي</span>
          </span>
        </h1>

        <p className="landing-subtitle">
          تقنية ذكاء اصطناعي متقدمة لتحويل الكلام العربي إلى نص مكتوب
          <br />
          <span className="subtitle-highlight">مبني على نموذج Whisper من OpenAI</span>
        </p>

        {/* Action buttons */}
        <div className="landing-actions">
          <button
            id="btn-start-recording"
            className="btn-primary landing-btn"
            onClick={() => navigate('/record')}
          >
            <span className="btn-icon">🎙️</span>
            ابدأ تسجيل
            <span className="btn-ripple" />
          </button>
          <button
            id="btn-explore-more"
            className="btn-secondary landing-btn"
            onClick={() => navigate('/about')}
          >
            <span className="btn-icon">✨</span>
            استكشف المزيد
          </button>
        </div>

        {/* Feature badges */}
        <div className="feature-badges">
          <div className="badge glass-card">
            <span className="badge-icon">⚡</span>
            <span>تحويل فوري</span>
          </div>
          <div className="badge glass-card">
            <span className="badge-icon">🎯</span>
            <span>دقة عالية</span>
          </div>
          <div className="badge glass-card">
            <span className="badge-icon">🌍</span>
            <span>لهجات متعددة</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-dot" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
