/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'primary' : '#FFF7e6',
        'secondary': '#fcd3d3',
        'primary_blue': '#e9f4ff'
      }
    },
  },
  plugins: [require("rippleui")],
}
