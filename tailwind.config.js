/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#2828D1",
        primaryLight: "#0070FF",
        secondary: "#BEE1FF",
        primaryBg: "#345976",
      },
    },
    fontFamily: {
      clash: ["ClashDisplay-Regular", "sans-serif"],
      clashmd: ["ClashDisplay-Medium", "sans-serif"],
      clashsm: ["ClashDisplay-Semibold", "sans-serif"],
      clashreg: ["ClashDisplay-Regular", "sans-serif"],
      clashbold: ["ClashDisplay-Bold", "sans-serif"],
    },
  },
  plugins: [],
};
