module.exports = {
  plugins: [
    require("postcss-import"),
    require("postcss-nesting"), // Make sure this comes before Tailwind
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
