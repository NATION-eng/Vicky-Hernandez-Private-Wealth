import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Cinzel", "Playfair Display", "Georgia", "serif"],
        display: ["var(--font-display)", "Cinzel", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        wealth: {
          navy: {
            950: "#070E1A",
            900: "#0B1526",
            850: "#0F1E36",
            800: "#152847",
            700: "#1D375F",
            600: "#27487B",
          },
          gold: {
            800: "#6B501B",
            700: "#8C6A28",
            600: "#AA8235",
            500: "#C59B47",
            400: "#D7B262",
            300: "#E6CA85",
            200: "#F2DFB3",
            100: "#F9F1DC",
            50: "#FCF9EE",
          },
          sand: {
            50: "#F8F9FA",
            100: "#F2F4F7",
            200: "#E5E8EE",
            300: "#D3D8E2",
          },
          charcoal: {
            950: "#0D1117",
            900: "#161B22",
            800: "#242C37",
            700: "#384454",
            600: "#505F74",
          },
          verified: {
            bg: "#ECFDF5",
            text: "#065F46",
            border: "#6EE7B7",
          },
          proposal: {
            bg: "#FFFBEB",
            text: "#92400E",
            border: "#FCD34D",
          },
          demo: {
            bg: "#FEF2F2",
            text: "#991B1B",
            border: "#F87171",
          },
        },
      },
      fontSize: {
        base: ["1.125rem", { lineHeight: "1.75rem" }],
        lg: ["1.25rem", { lineHeight: "1.85rem" }],
        xl: ["1.5rem", { lineHeight: "2.1rem" }],
        "2xl": ["1.875rem", { lineHeight: "2.35rem" }],
        "3xl": ["2.25rem", { lineHeight: "2.75rem" }],
        "4xl": ["2.75rem", { lineHeight: "3.25rem" }],
      },
      boxShadow: {
        'luxury': "0 4px 20px -2px rgba(11, 21, 38, 0.06), 0 2px 6px -1px rgba(11, 21, 38, 0.04)",
        'luxury-hover': "0 10px 30px -4px rgba(11, 21, 38, 0.10), 0 4px 10px -2px rgba(11, 21, 38, 0.05)",
      },
      minHeight: {
        touch: "48px",
      },
      minWidth: {
        touch: "48px",
      },
    },
  },
  plugins: [],
};
export default config;
