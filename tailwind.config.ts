/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-dark": "#0a0e17",
        "brand-green": "#00ff00",
        "brand-blue": "#7fdbff",
        primary: "#0a0e17",
        secondary: "#fff",
        borderPrimary: "#0a0e17",
        bgPrimary: "#fff",
        bgCards: "#fff",
        textHeading: "#000000",
        iconColorCards: "#489B4E",
        bgButton: "#0a0e17",
        bgButtonHover: "#0a0e17",
      },
    },
  },
  plugins: [],
};
