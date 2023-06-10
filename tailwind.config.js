/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins"],
        mont: ["Montserrat"],
        emoji: ["Noto Color Emoji"],
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
