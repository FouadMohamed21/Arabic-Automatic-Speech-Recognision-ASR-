import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
      title: 'تقنية Wav2Vec2 الذكية',
      desc: 'يعتمد النظام على أحدث تقنيات الذكاء الاصطناعي (Wav2Vec2)، وتم تدريبه وتخصيصه ببراعة ليفهم تفاصيل اللغة العربية بلهجاتها المختلفة.',
    },
    {
      icon: '🎯',
      title: 'دقة مبهرة',
      desc: 'النظام مدرب على آلاف الساعات من المقاطع الصوتية ليضمن لك تحويل كلامك إلى نص مكتوب بأعلى دقة ممكنة.',
    },
    {
      icon: '⚡',
      title: 'استجابة سريعة',
      desc: 'بفضل التحسينات في المعالجة، يتم تحويل صوتك إلى نص في ثوانٍ معدودة وبكل سلاسة.',
    },
  
  ];

  const team = [
  { name: "عمر محمد",   id: "8758", accent: "#378ADD" },
  { name: "كيرلس مرقص", id: "8622", accent: "#1D9E75" },
  { name: "فؤاد محمد",  id: "8612", accent: "#D85A30" },
];

  const techStack = [
    { name: 'Wav2Vec2', desc: 'عقل الذكاء الاصطناعي الأساسي', color: '#10b981' },
    { name: 'PyTorch', desc: 'محرك التعلم العميق', color: '#ef4444' },
    { name: 'FastAPI', desc: 'الخادم الخلفي السريع', color: '#06b6d4' },
    { name: 'React', desc: 'واجهة المستخدم التفاعلية', color: '#61dafb' },
    { name: 'HuggingFace', desc: 'مكتبة النماذج المتقدمة', color: '#fbbf24' },
    { name: 'Python', desc: 'لغة البرمجة الأساسية', color: '#3b82f6' },
    { name: 'Tailwind', desc: ' لغة التصميم الاساسية', color: '#cacacaff' },
    { name: 'Github', desc: '', color: '#06b6d4' },
  ];

  const steps = [
    { num: '01', title: 'تحدث بحرية', desc: 'اضغط على زر الميكروفون وابدأ بالتحدث بوضوح' },
    { num: '02', title: 'دع النظام يفكر', desc: 'الذكاء الاصطناعي يقوم بتحليل صوتك وترجمته إلى كلمات' },
    { num: '03', title: 'استلم نصك', desc: 'يظهر النص المُستخرج فوراً أمامك على الشاشة' },
  ];

  const animClass = `transition-all duration-800 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'}`;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[length:60px_60px]" />
        <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.15),transparent_70%)]" />
        <div className="absolute -bottom-[200px] -left-[200px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(192,132,252,0.1),transparent_70%)]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 py-4 px-4 md:px-8 z-10 flex justify-between items-center bg-[#0a051599] backdrop-blur-[12px] border-b border-border animate-fadeInDown">
        <button 
          className="flex items-center gap-2 py-2.5 px-5 bg-surface-glass backdrop-blur-[12px] border border-border rounded-full text-text-secondary text-[0.95rem] font-medium transition-all duration-300 ease-out hover:text-text-primary hover:border-primary-light hover:bg-surface-glass-hover hover:translate-x-1" 
          onClick={() => navigate('/')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
          الرئيسية
        </button>
        <button className="btn-primary px-4 md:px-6 py-2.5 text-[0.85rem] md:text-[0.95rem]" onClick={() => navigate('/record')}>
          🎙️ ابدأ تسجيل
        </button>
      </nav>

      <div className="relative z-[1] max-w-[1000px] mx-auto pt-24 pb-12 px-8">
        {/* Hero section */}
        <section className={`text-center mb-20 ${animClass} delay-100`}>
          
          <h1 className="font-primary text-[2rem] md:text-[2.8rem] font-black leading-tight mb-6">
            عن مشروع
            <span className="bg-gradient-primary bg-[length:200%_200%] bg-clip-text text-transparent animate-gradientShift"> التعرّف على الكلام العربي</span>
          </h1>
          <p className="text-[1.15rem] text-text-secondary max-w-[700px] mx-auto leading-loose">
            مشروع يهدف إلى بناء نظام متقدم للتعرف التلقائي على الكلام العربي (ASR) 
            باستخدام تقنيات التعلم العميق الحديثة، مع تحقيق دقة عالية .
          </p>

          <div className='mt-3 p-4 md:mt-6 flex items-center justify-center gap-4'>
            <button className='btn-primary px-4 md:px-6 py-2.5 text-[0.85rem] md:text-[0.95rem]'>
              <a href="https://github.com/FouadMohamed21/Arabic-Automatic-Speech-Recognision-ASR-.git" target='_blank'>
                GitHub
              </a>
            </button>
            <button className='btn-secondary px-4 md:px-6 py-2.5 text-[0.85rem] md:text-[0.95rem]'>
              <a href="https://drive.google.com/file/d/1GXurJNO26VIMRV1pcOuferQbuRWrrhIi/view?usp=drive_link" target='_blank'>
                Report
              </a>
            </button>
          </div>
        </section>

        {/* How it works */}
        <section className={`mb-20 ${animClass} delay-[250ms]`}>
          <h2 className="font-primary text-[1.8rem] font-extrabold flex items-center justify-center gap-3 mb-10 text-center">
            <span className="text-[1.4rem]">⚙️</span>
            كيف يعمل النظام؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="text-center py-8 px-6 relative glass-card">
                <div className="font-primary text-5xl font-black bg-gradient-primary bg-clip-text text-transparent mb-3 leading-none">{step.num}</div>
                <h3 className="font-primary text-[1.2rem] font-bold mb-3">{step.title}</h3>
                <p className="text-[0.95rem] text-text-secondary leading-loose">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className={`mb-20 ${animClass} delay-400`}>
          <h2 className="font-primary text-[1.8rem] font-extrabold flex items-center justify-center gap-3 mb-10 text-center">
            <span className="text-[1.4rem]">🚀</span>
            المميزات
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
            {features.map((feature, i) => (
              <div key={i} className="p-8 glass-card" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="text-[2.5rem] mb-4">{feature.icon}</div>
                <h3 className="font-primary text-[1.15rem] font-bold mb-3">{feature.title}</h3>
                <p className="text-[0.95rem] text-text-secondary leading-loose">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section className={`mb-20 ${animClass} delay-[550ms]`}>
  <h2 className="font-primary text-[1.8rem] font-extrabold flex items-center justify-center gap-3 mb-10 text-center" dir="rtl">
    <span className="text-[1.4rem]">🛠️</span>
    التقنيات المستخدمة
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {techStack.map((tech, i) => (
      <div
        key={i}
        className="group relative overflow-hidden flex items-center gap-4 py-5 px-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:-translate-y-0.5 hover:border-white/20 transition-all duration-200"
        dir="rtl"
      >
        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: tech.color }}
        />

        {/* Icon dot */}
        <div
          className="w-[42px] h-[42px] rounded-xl flex items-center justify-center shrink-0 border"
          style={{
            background: `${tech.color}14`,
            borderColor: `${tech.color}33`,
          }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: tech.color }}
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-0.5 flex-1 text-right">
          <span className="font-primary text-[1.05rem] font-bold">{tech.name}</span>
          <span className="text-[0.82rem] text-text-muted">{tech.desc}</span>
        </div>

        {/* Category badge */}
        {tech.category && (
          <span
            className="absolute bottom-3 left-3.5 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full opacity-80"
            style={{
              background: `${tech.color}18`,
              color: tech.color,
            }}
          >
            {tech.category}
          </span>
        )}
      </div>
    ))}
  </div>
</section>

        {/* CTA */}
        <section className={`mb-16 ${animClass} delay-700`}>
          <div className="text-center py-10 md:py-14 px-6 md:px-8 bg-[#8b5cf60f] border-[#8b5cf640] glass-card">
            <h2 className="font-primary text-[2rem] font-extrabold mb-4">جاهز لتجربة النظام؟</h2>
            <p className="text-text-secondary text-[1.05rem] mb-8 leading-loose">ابدأ الآن واختبر قوة الذكاء الاصطناعي في تحويل كلامك العربي إلى نص مكتوب</p>
            <button className="btn-primary text-[1.15rem] py-[18px] px-12" onClick={() => navigate('/record')}>
              🎙️ ابدأ التسجيل الآن
            </button>
          </div>
        </section>

        {/* Footer */}
      <footer className="px-6 pt-10 pb-6" dir="rtl">
  {/* Divider with label */}
  <div className="flex items-center gap-0 mb-6">
    <div className="flex-1 h-px bg-border" />
    <span className="px-4 text-[10px] uppercase tracking-widest text-text-muted/50">
      made by
    </span>
    <div className="flex-1 h-px bg-border" />
  </div>

  {/* Team grid */}
  <div className="grid grid-cols-3 gap-px  border border-border rounded-xl overflow-hidden mb-5">
    {team.map((m) => (
      <div
        key={m.id}
        className=" flex flex-col items-center gap-1.5 py-4 px-3   duration-150"
      >
        <div className="w-5 h-0.5 rounded-full" />
        <span className="text-[13px] font-medium text-center">{m.name}</span>
        <span className="text-[10px] text-text-muted/60 bg-white/5 border border-border rounded-full px-2.5 py-0.5 tabular-nums">
          {m.id}
        </span>
      </div>
    ))}
  </div>


</footer>
      </div>
    </div>
  );
}

export default AboutPage;
