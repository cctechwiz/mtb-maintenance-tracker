/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#00171F',
        'blue-dark': '#003459',
        'blue-medium': '#007EA7',
        'blue-light': '#00A8E8'
      }
    },
  },
  plugins: [],
}