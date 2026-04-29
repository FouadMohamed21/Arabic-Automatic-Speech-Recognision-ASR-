import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './AboutPage.css';

function AboutPage() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: '🧠',
      title: 'نموذج Whisper',
      desc: 'مبني على نموذج Whisper من OpenAI، مع fine-tuning مخصص للغة العربية لتحسين دقة التعرف بشكل ملحوظ.',
    },
    {
      icon: '🎯',
      title: 'دقة عالية',
      desc: 'تم تدريب النموذج على مجموعات بيانات عربية متنوعة لضمان أعلى مستويات الدقة في التعرف على الكلام.',
    },
    {
      icon: '⚡',
      title: 'معالجة سريعة',
      desc: 'تحويل الصوت إلى نص في ثوانٍ معدودة بفضل البنية المحسّنة للنموذج وخط المعالجة الفعّال.',
    },
    {
      icon: '🌍',
      title: 'دعم اللهجات',
      desc: 'يدعم النظام مجموعة واسعة من اللهجات العربية بالإضافة إلى العربية الفصحى.',
    },
    {
      icon: '🔒',
      title: 'خصوصية البيانات',
      desc: 'جميع التسجيلات تُعالج بشكل آمن ولا يتم تخزينها بعد انتهاء عملية التحويل.',
    },
    {
      icon: '📱',
      title: 'تصميم متجاوب',
      desc: 'واجهة مستخدم أنيقة تعمل بسلاسة على جميع الأجهزة والشاشات المختلفة.',
    },
  ];

  const techStack = [
    { name: 'Whisper', desc: 'نموذج التعرف على الكلام', color: '#10b981' },
    { name: 'PyTorch', desc: 'إطار التعلم العميق', color: '#ef4444' },
    { name: 'FastAPI', desc: 'الخادم الخلفي', color: '#06b6d4' },
    { name: 'React', desc: 'واجهة المستخدم', color: '#61dafb' },
    { name: 'HuggingFace', desc: 'منصة النماذج', color: '#fbbf24' },
    { name: 'Python', desc: 'لغة البرمجة', color: '#3b82f6' },
  ];

  const steps = [
    { num: '01', title: 'التسجيل', desc: 'اضغط على زر الميكروفون وابدأ بالتحدث بوضوح' },
    { num: '02', title: 'المعالجة', desc: 'يتم إرسال الصوت إلى النموذج للتحليل والتحويل' },
    { num: '03', title: 'النتيجة', desc: 'يظهر النص المُستخرج فوراً على الشاشة' },
  ];

  return (
    <div className={`about-page ${visible ? 'visible' : ''}`}>
      {/* Background decoration */}
      <div className="about-bg">
        <div className="grid-pattern" />
        <div className="bg-gradient-top" />
        <div className="bg-gradient-bottom" />
      </div>

      {/* Navigation */}
      <nav className="about-nav">
        <button className="nav-back" onClick={() => navigate('/')}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
          الرئيسية
        </button>
        <button className="btn-primary nav-record-btn" onClick={() => navigate('/record')}>
          🎙️ ابدأ تسجيل
        </button>
      </nav>

      <div className="about-content">
        {/* Hero section */}
        <section className="about-hero anim-item">
          <div className="hero-badge">
            <span>✨</span> نظام ذكاء اصطناعي متقدم
          </div>
          <h1 className="about-title">
            عن مشروع
            <span className="gradient-text"> التعرّف على الكلام العربي</span>
          </h1>
          <p className="about-desc">
            مشروع أكاديمي يهدف إلى بناء نظام متقدم للتعرف التلقائي على الكلام العربي (ASR) 
            باستخدام تقنيات التعلم العميق الحديثة، مع التركيز على دعم اللهجات المتنوعة 
            وتحقيق دقة عالية في بيئات مختلفة.
          </p>
        </section>

        {/* How it works */}
        <section className="how-section anim-item">
          <h2 className="section-title">
            <span className="section-icon">⚙️</span>
            كيف يعمل النظام؟
          </h2>
          <div className="steps-grid">
            {steps.map((step, i) => (
              <div key={i} className="step-card glass-card">
                <div className="step-num">{step.num}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
                {i < steps.length - 1 && <div className="step-connector" />}
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="features-section anim-item">
          <h2 className="section-title">
            <span className="section-icon">🚀</span>
            المميزات
          </h2>
          <div className="features-grid">
            {features.map((feature, i) => (
              <div key={i} className="feature-card glass-card" style={{ '--delay': `${i * 0.1}s` }}>
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section className="tech-section anim-item">
          <h2 className="section-title">
            <span className="section-icon">🛠️</span>
            التقنيات المستخدمة
          </h2>
          <div className="tech-grid">
            {techStack.map((tech, i) => (
              <div key={i} className="tech-card glass-card">
                <div className="tech-dot" style={{ background: tech.color }} />
                <div className="tech-info">
                  <span className="tech-name">{tech.name}</span>
                  <span className="tech-desc">{tech.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section anim-item">
          <div className="cta-card glass-card">
            <h2 className="cta-title">جاهز لتجربة النظام؟</h2>
            <p className="cta-desc">ابدأ الآن واختبر قوة الذكاء الاصطناعي في تحويل كلامك العربي إلى نص مكتوب</p>
            <button className="btn-primary cta-btn" onClick={() => navigate('/record')}>
              🎙️ ابدأ التسجيل الآن
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="about-footer">
          <p>مشروع التعرّف على الكلام العربي — {new Date().getFullYear()}</p>
          <p className="footer-sub">تم التطوير ضمن مشروع التخرج • معالجة الكلام</p>
        </footer>
      </div>
    </div>
  );
}

export default AboutPage;
