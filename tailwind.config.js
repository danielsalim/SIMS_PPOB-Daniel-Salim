/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'saldo': "url('/public/Background Saldo.png')",
      }
    },
  },
  plugins: [],
}

