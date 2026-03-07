import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        // Semantic — mapped to CSS variables so they swap on theme change
        bg:        'var(--bg)',
        surface:   'var(--surface)',
        's2':      'var(--surface-2)',
        's3':      'var(--surface-3)',
        border:    'var(--border)',
        'border-h':'var(--border-hover)',
        text:      'var(--text-primary)',
        'text-sec':'var(--text-secondary)',
        'text-mut':'var(--text-muted)',
        // Fixed accent palette
        purple:  '#8b5cf6',
        blue:    '#3b82f6',
        green:   '#10b981',
        amber:   '#f59e0b',
        red:     '#ef4444',
        pink:    '#ec4899',
        indigo:  '#6366f1',
        cyan:    '#06b6d4',
      },
      borderRadius: {
        'xs':  '4px',
        'sm':  '6px',
        DEFAULT:'10px',
        'lg':  '14px',
        'xl':  '20px',
        '2xl': '28px',
      },
      keyframes: {
        'orb-1': {
          '0%':   { transform: 'translate(0,0) scale(1)' },
          '100%': { transform: 'translate(60px,40px) scale(1.12)' },
        },
        'orb-2': {
          '0%':   { transform: 'translate(0,0) scale(1)' },
          '100%': { transform: 'translate(-40px,60px) scale(1.08)' },
        },
        'orb-3': {
          '0%':   { transform: 'translate(0,0) scale(1)' },
          '100%': { transform: 'translate(30px,-50px) scale(1.15)' },
        },
        'shimmer-text': {
          '0%':   { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '250% center' },
        },
        'pulse-dot': {
          '0%,100%': { boxShadow: '0 0 0 3px rgba(16,185,129,.2)' },
          '50%':      { boxShadow: '0 0 0 6px rgba(16,185,129,.05)' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'orb-1':        'orb-1 12s ease-in-out infinite alternate',
        'orb-2':        'orb-2 15s ease-in-out infinite alternate',
        'orb-3':        'orb-3 10s ease-in-out infinite alternate',
        'shimmer-text': 'shimmer-text 5s linear infinite',
        'pulse-dot':    'pulse-dot 2.5s ease-in-out infinite',
        'fade-up':      'fade-up 0.4s ease both',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0,0,0,.55)',
        'card-lg': '0 20px 60px rgba(0,0,0,.65)',
        'modal': '0 32px 80px rgba(0,0,0,.75)',
      },
    },
  },
  plugins: [],
};

export default config;
