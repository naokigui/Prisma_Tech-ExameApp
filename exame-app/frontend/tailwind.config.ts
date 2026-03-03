/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary:          "#1ADEC4",
        "primary-dark":   "#15BBA8",
        "primary-darker": "#0D8C7A",
        "primary-light":  "#E6FAF7",
        "primary-lighter":"#CCF5EF",
        "off-white":      "#F8FAFA",
        "border-light":   "#E8ECEC",
        "c-title":        "#1A1A1A",
        "c-body":         "#404040",
        "c-secondary":    "#666666",
        "c-disabled":     "#999999",
        "c-border":       "#CCCCCC",
        "c-success":      "#52C41A",
        "c-error":        "#FF4D4F",
        "c-warning":      "#FFA940",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body:    ["var(--font-dm-sans)", "sans-serif"],
      },
      animation: {
        "fade-up":    "fadeUp .55s ease both",
        "fade-up-1":  "fadeUp .55s .12s ease both",
        "fade-up-2":  "fadeUp .55s .24s ease both",
        "fade-up-3":  "fadeUp .55s .36s ease both",
        "pulse-dot":  "pulseDot 2s ease-in-out infinite",
        "bar-grow":   "barGrow 1.4s .6s ease both",
        "slide-card": "slideCard 3.5s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeUp:    { "0%":{ opacity:"0", transform:"translateY(20px)" }, "100%":{ opacity:"1", transform:"translateY(0)" } },
        pulseDot:  { "0%,100%":{ opacity:"1", transform:"scale(1)" }, "50%":{ opacity:".4", transform:"scale(1.6)" } },
        barGrow:   { "0%":{ width:"0%" }, "100%":{ width:"68%" } },
        slideCard: { "0%":{ transform:"translateX(0)" }, "100%":{ transform:"translateX(5px)" } },
      },
      boxShadow: {
        "primary-sm":  "0 4px 14px rgba(26,222,196,.3)",
        "primary-md":  "0 8px 28px rgba(26,222,196,.4)",
        "primary-lg":  "0 14px 40px rgba(26,222,196,.5)",
        "card":        "0 2px 12px rgba(0,0,0,.06)",
        "card-hover":  "0 10px 36px rgba(0,0,0,.1)",
      },
    },
  },
  plugins: [],
};
