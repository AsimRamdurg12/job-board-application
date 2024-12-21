/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "orange":{ 500: "#F05537"},
        "blue": {600: "#275DF5"}
      }
    },
  },
  plugins: [],
}