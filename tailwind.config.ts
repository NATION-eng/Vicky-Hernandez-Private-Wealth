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
      colors: {
        wealth: {
          navy: {
            950: "#060F1D",
            900: "#0A192F",
            850: "#0E233F",
            800: "#143054",
            700: "#1F4270",
            600: "#2B568F",
          },
          gold: {
            700: "#7A5920",
            600: "#946E2A",
            500: "#B3873B",
            400: "#CBA052",
            300: "#DEC07D",
            100: "#F6EEDB",
            50: "#FAF6ED",
          },
          sand: {
            50: "#FAF9F5",
            100: "#F4F2EA",
            200: "#EAE6D9",
            300: "#DDD7C3",
          },
          charcoal: {
            900: "#1A1D20",
            800: "#2C3136",
            700: "#444B52",
            600: "#5D6670",
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
        // Senior-first typography: comfortable 18px base text
        base: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
        lg: ["1.25rem", { lineHeight: "1.85rem" }],   // 20px
        xl: ["1.5rem", { lineHeight: "2.1rem" }],     // 24px
        "2xl": ["1.875rem", { lineHeight: "2.35rem" }], // 30px
        "3xl": ["2.25rem", { lineHeight: "2.75rem" }],  // 36px
        "4xl": ["2.75rem", { lineHeight: "3.25rem" }],  // 44px
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
