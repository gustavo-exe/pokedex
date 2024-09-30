/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          "white": "#fefcfd",
          "red": "#b42910",
          "dark": "#1a1a1a",
          "base-dark": "#252525ff"
        }
      }
    },
  },
  plugins: [],
}

