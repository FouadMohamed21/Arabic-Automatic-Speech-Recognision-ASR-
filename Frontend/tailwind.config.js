/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8b5cf6',
          light: '#a78bfa',
          dark: '#7c3aed',
        },
        accent: {
          DEFAULT: '#c084fc',
          warm: '#f59e0b',
        },
        surface: {
          DEFAULT: 'rgba(15, 10, 30, 0.85)',
          glass: 'rgba(139, 92, 246, 0.08)',
          'glass-hover': 'rgba(139, 92, 246, 0.15)',
        },
        text: {
          primary: '#f1f0f5',
          secondary: 'rgba(241, 240, 245, 0.65)',
          muted: 'rgba(241, 240, 245, 0.4)',
        },
        border: {
          DEFAULT: 'rgba(139, 92, 246, 0.2)',
          hover: 'rgba(139, 92, 246, 0.4)',
        },
      },
      fontFamily: {
        primary: ['Cairo', 'Tajawal', 'sans-serif'],
        body: ['Tajawal', 'Cairo', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #7c3aed, #a78bfa, #c084fc)',
        'gradient-warm': 'linear-gradient(135deg, #f59e0b, #ef4444)',
        'gradient-surface': 'linear-gradient(180deg, rgba(15, 10, 30, 0.9), rgba(30, 15, 60, 0.7))',
      },
      boxShadow: {
        glow: '0 0 40px rgba(139, 92, 246, 0.3)',
        card: '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'ease-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.8)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        pulseCustom: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        soundWave: {
          '0%': { height: '5px' },
          '50%': { height: '30px' },
          '100%': { height: '5px' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        rotateGlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        typewriter: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        blink: {
          '0%, 100%': { borderColor: 'var(--primary)' },
          '50%': { borderColor: 'transparent' },
        },
        orbFloat1: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-40px, 40px)' },
        },
        orbFloat2: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(30px, -30px)' },
        },
        orbFloat3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-20px, 20px) scale(1.2)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1.15)' },
        },
        particleFloat: {
          '0%, 100%': { opacity: '0', transform: 'translateY(0) translateX(0)' },
          '20%': { opacity: '0.6' },
          '50%': { opacity: '0.3', transform: 'translateY(-80px) translateX(20px)' },
          '80%': { opacity: '0.5' },
        },
        scrollDot: {
          '0%, 100%': { opacity: '1', transform: 'translateY(0)' },
          '50%': { opacity: '0.3', transform: 'translateY(10px)' },
        },
        vizPulse: {
          '0%': { height: '4px', opacity: '0.4' },
          '100%': { height: 'calc(10px + var(--level, 0.5) * 25px)', opacity: '1' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        fadeInDown: 'fadeInDown 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        fadeIn: 'fadeIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        scaleIn: 'scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        float: 'float 4s ease-in-out infinite',
        pulseCustom: 'pulseCustom 3s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
        ripple1: 'ripple 2s 0s ease-out infinite',
        ripple2: 'ripple 2s 0.5s ease-out infinite',
        ripple3: 'ripple 2s 1s ease-out infinite',
        soundWave: 'soundWave 1.5s var(--delay) ease-in-out infinite',
        gradientShift: 'gradientShift 3s ease infinite',
        gradientShiftSlow: 'gradientShift 4s ease-in-out infinite',
        rotateGlow: 'rotateGlow 3s linear infinite',
        orbFloat1: 'orbFloat1 12s ease-in-out infinite',
        orbFloat2: 'orbFloat2 15s ease-in-out infinite',
        orbFloat3: 'orbFloat3 10s ease-in-out infinite',
        slowZoom: 'slowZoom 30s ease-in-out infinite alternate',
        particleFloat: 'particleFloat var(--duration) var(--delay) ease-in-out infinite',
        scrollDot: 'scrollDot 2s ease-in-out infinite',
        vizPulse: 'vizPulse 0.8s calc(var(--i) * 0.05s) ease-in-out infinite alternate',
        spin: 'spin 0.8s linear infinite',
      },
    },
  },
  plugins: [],
}
