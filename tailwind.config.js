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
        "bg-primary-green": "#0D9276", // Example Sauzi Tours brand
        "secondary-green": "#0B6A5B", // Example Sauzi Tours brand
        "accent-yellow": "#F2C94C", // Example Sauzi Tours brand
        "background-gray": "#F5F5F5", // Example Sauzi Tours brand
        "text-gray": "#333333", // Example Sauzi Tours brand
      },
    },
  },
  plugins: [],
}
