// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // src 폴더 내 모든 파일을 포함
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // components 폴더
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // pages 폴더
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
