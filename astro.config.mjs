import { defineConfig } from "astro/config";
//import tailwind from "@astrojs/tailwind";

import vue from "@astrojs/vue";

//import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  //integrations: [tailwind(), vue()],
  integrations: [vue()],
  //output: "hybrid",
  //adapter: netlify(),
});
