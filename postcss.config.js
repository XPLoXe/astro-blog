import postcssImport from "postcss-import";
import postcssNesting from "postcss-nesting";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    postcssImport,
    postcssNesting, // Make sure this comes before Tailwind
    tailwindcss,
    autoprefixer,
  ],
};
