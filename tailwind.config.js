/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        faint: 'rgb(var(--faint) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-2': 'rgb(var(--accent-2) / <alpha-value>)',
        'accent-text': 'rgb(var(--accent-text) / <alpha-value>)',
        'accent-soft': 'rgb(var(--accent-soft) / <alpha-value>)',
        'accent-ink': 'rgb(var(--accent-ink) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        xs: ['0.8rem', { lineHeight: '1.5' }],
        sm: ['0.9rem', { lineHeight: '1.55' }],
        base: ['1rem', { lineHeight: '1.7' }],
        lg: ['1.125rem', { lineHeight: '1.65' }],
        xl: ['1.3rem', { lineHeight: '1.45' }],
        '2xl': ['1.65rem', { lineHeight: '1.3' }],
        '3xl': ['2.1rem', { lineHeight: '1.2' }],
        '4xl': ['2.7rem', { lineHeight: '1.12' }],
        '5xl': ['3.4rem', { lineHeight: '1.06' }],
        '6xl': ['4.2rem', { lineHeight: '1.02' }],
      },
      borderRadius: {
        sm: '8px',
        DEFAULT: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
      },
      boxShadow: {
        soft: '0 1px 2px rgb(var(--shadow) / 0.04), 0 12px 32px -16px rgb(var(--shadow) / 0.2)',
        lift: '0 2px 4px rgb(var(--shadow) / 0.06), 0 24px 56px -20px rgb(var(--shadow) / 0.34)',
      },
      maxWidth: {
        content: '72rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
