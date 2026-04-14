import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0F172A",
        brand: {
          black: "#0D0F0E",
          surface: "#1A1D1B",
          card: "#222722",
          gold: "#C9A85C",
          bone: "#F2EDE4",
          muted: "#8A9088",
          emerald: "#10B981",
          orange: "#f97316",
        },
      },
      fontFamily: {
        sans: ["var(--font-barlow)", "system-ui", "sans-serif"],
        condensed: [
          "var(--font-barlow-condensed)",
          "var(--font-barlow)",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
