/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f8fafc',
          500: '#3b82f6',
          900: '#1e293b',
        },
      },
      keyframes: {
        'bell-ring': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(15deg)' },
          '50%': { transform: 'rotate(-15deg)' },
          '75%': { transform: 'rotate(-10deg)' },
        }
      },
      animation: {
        'bell-ring': 'bell-ring 2s ease-in-out infinite',
      },
    }, // Aquí cierra el extend
  }, // Aquí cierra el theme
  plugins: [],
}