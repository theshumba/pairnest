import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cozy color palette for Pair Nest rooms
        cozy: {
          cream: "#FFF8F0",
          beige: "#F5E6D3",
          brown: "#8B7355",
          green: "#7A9B76",
          sage: "#B5C4A1",
          sky: "#C7D9E8",
          lavender: "#D4C5E2",
          rose: "#E8C5C5",
          peach: "#F5D5C5",
        },
        // Biome-specific colors
        forest: {
          light: "#E8F3E8",
          DEFAULT: "#7A9B76",
          dark: "#4A6B47",
        },
        beach: {
          light: "#F0F7FF",
          DEFAULT: "#87CEEB",
          dark: "#5B9BD5",
        },
        arctic: {
          light: "#F0F8FF",
          DEFAULT: "#B8D4E8",
          dark: "#6B8FA3",
        },
        desert: {
          light: "#FFF3E0",
          DEFAULT: "#D4A574",
          dark: "#8B6F47",
        },
        jungle: {
          light: "#E6F4E6",
          DEFAULT: "#4CAF50",
          dark: "#2E7D32",
        },
        mountain: {
          light: "#ECEFF1",
          DEFAULT: "#78909C",
          dark: "#455A64",
        },
        plastic: {
          pink: "#FF00CC",
          pinkDark: "#99007A",
          cyan: "#00FFFF",
          cyanDark: "#009999",
          lime: "#CCFF00",
          limeDark: "#7A9900",
          purple: "#9D00FF",
          bg: "#2A0A3D",
          surface: "rgba(255, 255, 255, 0.15)",
          glass: "rgba(255, 255, 255, 0.25)",
        },
        rarity: {
          common: "#A0AEC0",
          uncommon: "#48BB78",
          rare: "#4299E1",
          epic: "#9F7AEA",
          legendary: "#F6E05E",
        },
      },
      fontFamily: {
        plastic: ['"Fredoka"', "sans-serif"],
        data: ['"VT323"', "monospace"],
        hand: ['"Patrick Hand"', "cursive"],
        cozy: ['"Nunito"', "sans-serif"],
      },
      boxShadow: {
        "plastic-card": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "plastic-btn":
          "0 6px 0px rgba(0,0,0,0.2), 0 10px 10px rgba(0,0,0,0.3), inset 0 2px 0 rgba(255,255,255,0.4)",
        "plastic-btn-pressed": "0 0px 0px rgba(0,0,0,0.2), inset 0 4px 8px rgba(0,0,0,0.4)",
        "neon-glow": "0 0 10px #FF00CC, 0 0 20px #FF00CC",
        "screen-glow": "inset 0 0 20px rgba(255,255,255,0.1)",
      },
      backgroundImage: {
        "gloss-gradient":
          "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.1) 100%)",
        "grid-pattern":
          "linear-gradient(rgba(255, 0, 204, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)",
        "holo-foil":
          "linear-gradient(135deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 70%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "bounce-slow": "bounce 3s infinite",
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 12s linear infinite",
        shine: "shine 2s infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        sway: "sway 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shine: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".text-3d": {
          "text-shadow": "0 2px 0 #000, 0 4px 0 rgba(0,0,0,0.4)",
        },
        ".text-glow": {
          "text-shadow": "0 0 10px currentColor",
        },
      });
    }),
  ],
};

export default config;
