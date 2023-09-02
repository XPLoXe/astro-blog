/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#00668A",
        "weather-secondary": "#004E71",
        primary: "#0f172a",
        secondary: "#6b21a8",
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      //breakpoints
      sm: "640px",
      md: "768px",
      lg: "900px",
    },
  },
  plugins: [],
};
