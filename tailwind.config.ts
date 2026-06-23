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
        "terminal-green": "#00ff41",
        "dark-bg": "#000000",
        "dark-surface": "#080808",
        "dark-border": "#111111",
        "muted": "#1a1a1a",
        "muted-light": "#333333",
        "foreground": "#ffffff",
        "foreground-dim": "#999999",
        "accent": "#8b7bff",
        "accent-dim": "#6b5fd6",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        "glass": "0 8px 32px rgba(0, 0, 0, 0.4)",
        "premium": "0 4px 24px rgba(0, 0, 0, 0.5)",
        "glow": "0 0 20px rgba(0, 255, 65, 0.15)",
        "glow-strong": "0 0 40px rgba(0, 255, 65, 0.25)",
      },
      animation: {
        "pulse-slow": "pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scan-line": "scan-line 8s linear infinite",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
        "type": "type 3.5s steps(40, end)",
        "glitch": "glitch 0.2s infinite",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "scan-line": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        type: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
