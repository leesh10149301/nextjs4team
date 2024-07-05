import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.svg",
  ],
  theme: {
    extend: {
      keyframes: {
        "scale-up-br": {
          "0%": {
            transform: "scale(0)",
            "transform-origin": "100% 100%",
          },
          "100%": {
            transform: "scale(1)",
            "transform-origin": "100% 100%",
          },
        },
        "scale-down-br": {
          "0%": {
            transform: "scale(1)",
            "transform-origin": "100% 100%",
          },
          "100%": {
            transform: "scale(0)",
            "transform-origin": "100% 100%",
          },
        },
        "scale-up-hor-left": {
          "0%": {
            transform: "scaleX(0)",
            "transform-origin": "100% 50%",
            opacity: "1",
          },
          "100%": {
            transform: "scaleX(1)",
            "transform-origin": "100% 50%",
            opacity: "1",
          },
        },
        "scale-down-hor-left": {
          "0%": {
            transform: "scaleX(1)",
            "transform-origin": "100% 50%",
            opacity: "1",
          },
          "100%": {
            transform: "scaleX(0)",
            "transform-origin": "100% 50%",
            opacity: "1",
          },
        },
      },
      animation: {
        "scale-up-br":
          "scale-up-br 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
        "scale-down-br":
          "scale-down-br 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "scale-up-hor-left":
          "scale-up-hor-left 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
        "scale-down-hor-left":
          "scale-down-hor-left 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
    },
  },
  plugins: [],
};

export default config;
