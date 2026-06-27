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
          black: '#ffffff',
          nearblack: '#ffffff',
          green: '#003c33',
          navy: '#071829',
          blue: '#60a5fa',
          coral: '#ff7759',
          softcoral: '#ffad9b',
          white: '#0d0d12',
          stone: '#18181b',
          palegreen: '#10251c',
          paleblue: '#111827',
          cardborder: '#27272a',
          ink: '#e4e4e7',
          muted: '#71717a',
          slate: '#a1a1aa',
          hairline: '#27272a',
          borderlight: '#27272a',
          errorred: '#f87171',
        },
        base: '#0d0d12',
        container: '#18181b',
        muted: '#71717a',
        accent: 'var(--theme-accent, #1863dc)',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
