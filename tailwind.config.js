/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "tw-blue": {
          50: "#ecf1ff",
          100: "#dce6ff",
          200: "#c0d0ff",
          300: "#99afff",
          400: "#7183ff",
          500: "#5059ff",
          600: "#3731fa",
          700: "#2a21d8",
          800: "#2521b2",
          900: "#24238c",
          950: "#161551",
        },
      },
    },
  },
  plugins: [],
};
