/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0D11',
        surface: {
          DEFAULT: '#12161F',
          subtle: '#181D28',
          border: '#232936',
          hover: '#1E2432',
        },
        primary: {
          DEFAULT: '#6366F1', // Indigo
          hover: '#4F46E5',
          light: '#818CF8',
          muted: '#312E81',
        },
        accent: {
          purple: '#8B5CF6',
          teal: '#14B8A6',
          amber: '#F59E0B',
          emerald: '#10B981',
          rose: '#F43F5E',
        },
        text: {
          main: '#F3F4F6',
          muted: '#9CA3AF',
          dim: '#6B7280',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
        handwriting: ['Caveat', 'cursive', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
