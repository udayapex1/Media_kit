import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cohere: {
          black: '#000000',
          nearblack: '#17171c',
          green: '#003c33',
          navy: '#071829',
          blue: '#1863dc',
          coral: '#ff7759',
          softcoral: '#ffad9b',
          white: '#ffffff',
          stone: '#eeece7',
          palegreen: '#edfce9',
          paleblue: '#f1f5ff',
          cardborder: '#f2f2f2',
          ink: '#212121',
          muted: '#93939f',
          slate: '#75758a',
          hairline: '#d9d9dd',
          borderlight: '#e5e7eb',
        },
        base: '#ffffff',
        container: '#ffffff',
        muted: '#d9d9dd',
        accent: 'var(--theme-accent, #1863dc)',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
