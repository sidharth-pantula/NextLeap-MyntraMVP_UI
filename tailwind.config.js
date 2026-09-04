/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#b90041",
        "primary-brand": "#FF3F6C",
        "primary-container": "#df2457",
        "primary-fixed": "#ffd9dc",
        "primary-fixed-dim": "#ffb2ba",
        "on-primary": "#ffffff",
        "on-primary-container": "#fffbff",
        "on-primary-fixed": "#400011",
        "on-primary-fixed-variant": "#910031",
        
        "ai-gradient-start": "#7952FF",
        "ai-gradient-end": "#FF3F6C",
        
        "tertiary": "#6134e6",
        "tertiary-container": "#7a53ff",
        "tertiary-fixed": "#e7deff",
        "tertiary-fixed-dim": "#cbbeff",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#fffbff",
        "on-tertiary-fixed": "#1d0061",
        "on-tertiary-fixed-variant": "#4b07d1",

        "secondary": "#5a5d73",
        "secondary-container": "#dbdef8",
        "secondary-fixed": "#dee1fa",
        "secondary-fixed-dim": "#c2c5de",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#5e6177",
        "on-secondary-fixed": "#161b2d",
        "on-secondary-fixed-variant": "#42465a",

        "surface": "#f9f9ff",
        "surface-bright": "#f9f9ff",
        "surface-dim": "#d5dae7",
        "surface-variant": "#dee2ef",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f0f3ff",
        "surface-container": "#e9eefb",
        "surface-container-high": "#e4e8f5",
        "surface-container-highest": "#dee2ef",

        "background": "#f9f9ff",
        "bg-off-white": "#F5F5F6",
        "on-background": "#171c25",
        "on-surface": "#171c25",
        "on-surface-variant": "#5b4042",
        "inverse-surface": "#2b313a",
        "inverse-on-surface": "#ecf1fd",

        "outline": "#8f6f72",
        "outline-variant": "#e3bdc0",

        "mrp-strikethrough": "#94969F",
        "success-green": "#03A685",
        "error": "#ba1a1a",
        "error-container": "#ffdad6",
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "2xl": "1rem",
        "full": "9999px"
      },
      spacing: {
        "grid-margin-mobile": "16px",
        "grid-margin-desktop": "40px",
        "gutter": "16px",
        "stack-xs": "4px",
        "stack-sm": "8px",
        "stack-md": "16px",
        "stack-lg": "32px",
      },
      fontFamily: {
        sans: ["'Hanken Grotesk'", "sans-serif"],
        "headline-lg": ["'Hanken Grotesk'", "sans-serif"],
        "display-lg": ["'Hanken Grotesk'", "sans-serif"],
        "title-md": ["'Hanken Grotesk'", "sans-serif"],
        "body-lg": ["'Hanken Grotesk'", "sans-serif"],
        "body-sm": ["'Hanken Grotesk'", "sans-serif"],
        "label-bold": ["'Hanken Grotesk'", "sans-serif"],
        "price-main": ["'Hanken Grotesk'", "sans-serif"],
        "price-mrp": ["'Hanken Grotesk'", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "800" }],
        "headline-lg": ["32px", { lineHeight: "40px", fontWeight: "700" }],
        "headline-lg-mobile": ["24px", { lineHeight: "30px", fontWeight: "700" }],
        "title-md": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "label-bold": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "700" }],
        "price-main": ["16px", { lineHeight: "1", fontWeight: "700" }],
        "price-mrp": ["13px", { lineHeight: "1", fontWeight: "400" }]
      }
    },
  },
  plugins: [],
}
