/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1c1b19',
        clay: '#855d49',
        moss: '#3a593c',
        cream: '#faf6f0',
        pearl: '#fffdf9',
        rose: '#e8c6bd',
        mist: '#edf1ee',
        turmeric: '#e0981e',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 30px rgba(58, 89, 60, 0.05)',
        glow: '0 12px 25px rgba(133, 93, 73, 0.15)',
      },
      borderRadius: {
        brand: '1.25rem',
      },
      backgroundImage: {
        'hero-wash':
          'radial-gradient(circle at 20% 20%, rgba(224,152,30,.15), transparent 32%), linear-gradient(135deg, #faf6f0 0%, #edf1ee 55%, #fffdf9 100%)',
      },
    },
  },
  plugins: [],
}
