/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F6B34',
          light: '#16823F',
          dark: '#0B5A2A',
        },
        footer: '#075426',
        accent: {
          DEFAULT: '#D9A441',
          light: '#E8C172',
          dark: '#C58D25',
        },
        earth: {
          DEFAULT: '#6B4423',
          light: '#8A5A30',
        },
        cream: '#F7F1E8',
        'soft-green': '#EAF6EC',
        'gold-soft': '#FFF4D8',
        ink: '#16301F',
        secondary: '#4B5C50',
        faint: '#7A8A80',
        soft: '#E9E2D6',
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'sans-serif'],
      },
      borderRadius: {
        card: '1rem',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(15, 107, 52, 0.08)',
        softLg: '0 12px 32px rgba(15, 107, 52, 0.12)',
      },
    },
  },
  plugins: [],
}
