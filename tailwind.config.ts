import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-geist-sans)", "system-ui"],
        quirk: ["var(--font-quirk)", "cursive"],
      },
      colors: {
        canvas: "rgb(var(--tw-canvas) / <alpha-value>)",
        surface: "rgb(var(--tw-surface) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--tw-ink) / <alpha-value>)",
          muted: "rgb(var(--tw-ink-muted) / <alpha-value>)",
          soft: "rgb(var(--tw-ink-soft) / <alpha-value>)",
        },
        line: "rgb(var(--tw-line) / <alpha-value>)",
        pastel: {
          mint: "#c8f0e4",
          peach: "#ffd9cf",
          lilac: "#e4ddff",
          lemon: "#fff2c2",
          sky: "#d3e9ff",
          rose: "#ffd8ea",
          butter: "#fff7e0",
        },
        accent: {
          DEFAULT: "#7b6fd6",
          soft: "#9b91e8",
          muted: "#5f5499",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(45, 42, 51, 0.04), 0 18px 48px -24px rgba(123, 111, 214, 0.18)",
        card: "0 1px 0 rgba(255,255,255,0.8) inset, 0 14px 40px -28px rgba(45, 42, 51, 0.12)",
        lift: "0 2px 8px rgba(45, 42, 51, 0.06), 0 24px 48px -32px rgba(123, 111, 214, 0.2)",
      },
      animation: {
        float: "float 18s ease-in-out infinite",
        "float-delayed": "float 22s ease-in-out infinite 2s",
        wiggle: "wiggle 2.8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(2%, -3%) scale(1.02)" },
          "66%": { transform: "translate(-2%, 2%) scale(0.98)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
