/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          100: '#FFE5E0',
          200: '#FFB2A9',
          500: '#FF7A59',
        },
      },
    },
  },
  plugins: [],
}
