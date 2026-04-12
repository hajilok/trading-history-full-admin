import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fbf9f8",
        surface: "#fbf9f8",
        "surface-bright": "#fbf9f8",
        "surface-dim": "#dbd9d9",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5f3f3",
        "surface-container": "#f0eded",
        "surface-container-high": "#eae8e7",
        "surface-container-highest": "#e4e2e2",
        "surface-variant": "#e4e2e2",
        "surface-tint": "#b52330",
        "on-surface": "#1b1c1c",
        "on-surface-variant": "#5a403f",
        "on-background": "#1b1c1c",
        primary: "#b52330",
        "primary-container": "#ff5a5f",
        "primary-fixed": "#ffdad8",
        "on-primary": "#ffffff",
        "on-primary-container": "#61000e",
        "on-primary-fixed": "#410007",
        "on-primary-fixed-variant": "#92001b",
        secondary: "#006a62",
        "secondary-container": "#7af7e8",
        "secondary-fixed": "#7af7e8",
        "secondary-fixed-dim": "#5bdacc",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#007168",
        "on-secondary-fixed": "#00201d",
        "on-secondary-fixed-variant": "#005049",
        tertiary: "#006c4c",
        "tertiary-container": "#00a879",
        "tertiary-fixed": "#78fac4",
        "tertiary-fixed-dim": "#59ddaa",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#003423",
        "on-tertiary-fixed": "#002115",
        "on-tertiary-fixed-variant": "#005139",
        outline: "#8e706f",
        "outline-variant": "#e2bebc",
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        "inverse-surface": "#303030",
        "inverse-on-surface": "#f2f0f0",
        "inverse-primary": "#ffb3b0",
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
        editorial: "2rem",
        capsule: "999px",
      },
      boxShadow: {
        ambient: "0 12px 32px -4px rgba(90, 64, 63, 0.08)",
        editorial: "0 26px 60px -30px rgba(108, 42, 39, 0.4)",
        insetSoft: "inset 0 1px 0 rgba(255, 255, 255, 0.65)",
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(180deg, #ff5a5f 0%, #b52330 100%)",
        "hero-glow":
          "radial-gradient(circle at top left, rgba(255, 90, 95, 0.17), transparent 32%), radial-gradient(circle at bottom right, rgba(122, 247, 232, 0.2), transparent 30%)",
        "soft-noise":
          "linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.18))",
      },
      fontFamily: {
        headline: ["var(--font-manrope)"],
        body: ["var(--font-inter)"],
        label: ["var(--font-inter)"],
      },
      letterSpacing: {
        editorial: "-0.05em",
      },
      maxWidth: {
        shell: "80rem",
      },
    },
  },
  plugins: [],
};

export default config;
