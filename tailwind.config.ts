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
          mint: "#00f5ff",
          peach: "#ff2bd6",
          lilac: "#ff4cf0",
          lemon: "#f5ff3a",
          sky: "#00f5ff",
          rose: "#ff2bd6",
          butter: "#111113",
        },
        accent: {
          DEFAULT: "rgb(var(--tw-accent) / <alpha-value>)",
          soft: "rgb(var(--tw-accent-soft) / <alpha-value>)",
          muted: "rgb(var(--tw-accent-muted) / <alpha-value>)",
        },
      },
      boxShadow: {
        soft: "0 0 16px rgba(255, 43, 214, 0.25)",
        card: "0 0 0 1px rgba(255,255,255,0.08), 0 18px 40px -24px rgba(0, 0, 0, 0.8)",
        lift: "0 0 28px rgba(0, 245, 255, 0.28), 0 16px 40px -20px rgba(255, 43, 214, 0.35)",
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
