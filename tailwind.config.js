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
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#1e3a5f',
          700: '#1a3352',
          800: '#152b45',
          900: '#0f1f33',
          950: '#0a1525',
        },
        gov: {
          blue: '#1e3a5f',
          darkblue: '#152b45',
          lightblue: '#e8f0fe',
          green: '#16a34a',
          red: '#dc2626',
          amber: '#f59e0b',
          gray: '#f8fafc',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
