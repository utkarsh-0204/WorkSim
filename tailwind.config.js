/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F6F6F2',
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#EFEEE8',
          border: '#DCDBD2',
          hover: '#E7E6DF',
        },
        primary: {
          DEFAULT: '#16202B',
          hover: '#293642',
          light: '#4B5B69',
          muted: '#E7E9E6',
        },
        accent: {
          purple: '#46586B',
          teal: '#3F7A52',
          amber: '#A3730F',
          emerald: '#3F7A52',
          rose: '#A8432E',
        },
        text: {
          main: '#1A2229',
          muted: '#5B6168',
          dim: '#8B8E8A',
        }
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
