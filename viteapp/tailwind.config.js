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
      colors: {
        primary: "#e48c17",
        secondary: "#aaa6c3", //f18112
        tertiary: "#111030", // 151030
        orange: "#ff6c22",
        brownish: "#67481c",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
        sm: "850px",
      },
      fontSize: {
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
