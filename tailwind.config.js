/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#3a005c",
        "weather-secondary": "#6b21a8",
        primary: "#0f172a",
        secondary: "#6b21a8",
        terciary: "#9400D3",
      },
    },
    fontFamily: {
      sans: ["Playpen Sans", "sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      //breakpoints
      xs: "543px",
      sm: "640px",
      md: "768px",
      lg: "900px",
      xl: "1200px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
