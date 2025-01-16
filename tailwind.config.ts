/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-dark": "#0a0e17",
        "brand-green": "#00ff00",
        "brand-blue": "#7fdbff",
        primary: "#469A4C",
        secondary: "#EDF6EE",
        borderPrimary: "#4EA95A",
        bgPrimary: "#4D9D52",
        bgCards: "#C8E2CB",
        textHeading: "#000000",
        iconColorCards: "#489B4E",
        bgButton: "#4EA95A",
        bgButtonHover: "#3d8847",
      },
    },
  },
  plugins: [],
};
