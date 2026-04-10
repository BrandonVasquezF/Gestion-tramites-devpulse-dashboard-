/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <--- Añade esta línea
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
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'bell-ring': 'bell-ring 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 3s ease-out forwards',
      },
    }, // Aquí cierra el extend
  }, // Aquí cierra el theme
  plugins: [],
}