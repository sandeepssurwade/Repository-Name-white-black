import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0c",
        "ink-soft": "#161615",
        paper: "#f6f4ef",
        "paper-dim": "#eeece4",
        stone: "#9a958c",
        "stone-dark": "#5c584f",
        gold: "#b98f4e",
        "gold-bright": "#e3c17a",
        silver: "#c7c9c6",
        line: "rgba(11,11,12,0.1)",
        "line-inverse": "rgba(246,244,239,0.14)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.32em",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      maxWidth: {
        content: "1440px",
      },
    },
  },
  plugins: [],
};
export default config;
