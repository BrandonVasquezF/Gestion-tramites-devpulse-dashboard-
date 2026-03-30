 /** @type {import('tailwindcss').Config} */
export default {
  // 1. CONTENT: El "Radar"
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // 2. THEME: Tu "Estilo Único"
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f8fafc',  // Tu nuevo color de FONDO (casi blanco)
          500: '#3b82f6', // El azul de tu logo
          900: '#1e293b', // Color para TEXTOS principales
        }
      }
    },
  },
  // 3. PLUGINS: Las "Expansiones"
  plugins: [],
}