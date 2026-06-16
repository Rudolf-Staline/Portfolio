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
        'line-strong': 'rgb(var(--line-strong) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        faint: 'rgb(var(--faint) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
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
        // Perfect-fourth-ish ample scale for confident display type
        xs: ['0.78rem', { lineHeight: '1.5' }],
        sm: ['0.9rem', { lineHeight: '1.55' }],
        base: ['1rem', { lineHeight: '1.7' }],
        lg: ['1.125rem', { lineHeight: '1.65' }],
        xl: ['1.4rem', { lineHeight: '1.4' }],
        '2xl': ['1.8rem', { lineHeight: '1.22' }],
        '3xl': ['2.35rem', { lineHeight: '1.12' }],
        '4xl': ['3.1rem', { lineHeight: '1.05' }],
        '5xl': ['4.1rem', { lineHeight: '1.0' }],
        '6xl': ['5.2rem', { lineHeight: '0.95' }],
        '7xl': ['6.6rem', { lineHeight: '0.92' }],
      },
      borderRadius: {
        // Sharp, technical — swiss
        none: '0px',
        sm: '2px',
        DEFAULT: '4px',
        lg: '6px',
        xl: '8px',
      },
      boxShadow: {
        card: '0 1px 0 rgb(var(--shadow) / 0.03), 0 10px 30px -18px rgb(var(--shadow) / 0.22)',
        'card-hover': '0 1px 0 rgb(var(--shadow) / 0.04), 0 22px 50px -22px rgb(var(--shadow) / 0.32)',
      },
      maxWidth: {
        content: '74rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'draw': {
          '0%': { strokeDashoffset: '1' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
