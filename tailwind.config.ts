/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A1628",
          light: "#112240",
          dark: "#060E1A",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E8C84A",
          dark: "#B8960C",
        },
        danger: "#E74C3C",
        safe: "#2ECC71",
        warning: "#F39C12",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
}
