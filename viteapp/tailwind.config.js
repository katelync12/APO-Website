/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    //"./components/**/*.{js,ts,jsx,tsx}",
    //"./pages/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        "royal-blue": "#0033ab",
        "royal-blue-700": "#00298a",
        "royal-blue-800": "#002376",
        gold: "#f7b612",
        "pastel-white": "#fefae0",
        "navy-blue": "#131826",
        "navy-blue-600": "#0c1736",
        white: "#ffffff",
        // primary: "#e48c17",
        // secondary: "#aaa6c3", //f18112
        // tertiary: "#111030", // 151030
        // orange: "#ff6c22",
        // brownish: "#67481c",
        "white-100": "#f3f3f3",
        "white-200": "#f8f8f8",
        "white-300": "#f5f5f5",
        "gray-100": "#f7f7f7",
        "gray-200": "#e8e8e8",
        "gray-300": "#d1d1d1",
        "gray-400": "#bcbcbc",
        "gray-500": "#8c8c8c",
        "gray-600": "#6c6c6c",
        "gray-700": "#4c4c4c",
        "gray-800": "#2d2d2d",
        "black-100": "#100d25",
        "black-200": "#090325",
        "black-300": "#0d0d0d",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
        sm: "850px",
        md: "1024px",
        lg: "1280px",
      },
      fontSize: {
        xs: "0.6rem",
        sm: "0.8rem",
        med: "0.9rem",
        base: "1rem",
        lg: "1.1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
        "5xl": "3rem",
        "6xl": "3.5rem",
        "7xl": "4rem",
        "8xl": "4.5rem",
        "9xl": "5rem",
        "10xl": "6rem",
        "11xl": "7rem",
        "12xl": "8rem",
        "13xl": "9rem",
        "14xl": "10rem",
        "15xl": "11rem",
      },
      transitionProperty: {
        filter: "filter",
      },
      dropShadow: {
        vite: "0 0 2em #646cffaa",
        react: "0 0 2em #61dafbaa",
      },
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow infinite 20s linear",
      },
    },
  },
  plugins: [],
};
