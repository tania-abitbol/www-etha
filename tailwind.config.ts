import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      yellow: "#F4CD04",
      yellowLighter: "#F4CD0480",
      black: "#000000",
      gray: {
        50: "#ffffff1a",
        100: "#F3F4F6",
        200: "#E5E7EB",
        300: "#D1D5DB",
        400: "#9CA3AF",
        500: "#6C6C6C",
        600: "#7A7A7A",
        700: "#5F5F5F",
        800: "#2F2F2F",
        900: "#181818",
      },
      white: "#FFFFFF",
      bae: {
        primary: "#EC4554",
        primaryLight: "#FFC0CF",
        primaryLighter: "#FF4F7880",
      },
      vouv: {
        primaryDark: "#252C3E",
        primary: "#3993DD",
        primaryLight: "#ABD9FF",
        primaryLighter: "#3993DD80",
      },
    },

    extend: {
      fontFamily: {
        baloo: ['"Baloo 2"', "cursive"],
        inter: ['"Inter"', "sans-serif"],
        body: "var(--font-roboto)",
        title: "var(--font-lexend-deca)",
        pacifico: "var(--font-pacifico)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
