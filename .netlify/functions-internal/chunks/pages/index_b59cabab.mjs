import { c as createAstro, b as createComponent, r as renderTemplate, m as maybeRenderHead, g as renderComponent } from '../astro_c89a7039.mjs';
import 'clsx';
import { $ as $$Showcase } from './about_f0b10ba6.mjs';
import { b as $$Card, a as $$Layout } from './_slug__73b7ba41.mjs';
/* empty css                           */import 'html-escaper';
import '@astrojs/internal-helpers/path';
/* empty css                           *//* empty css                           *//* empty css                          *//* empty css                            *//* empty css                           */
const $$Astro$1 = createAstro();
const $$Features = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Features;
  const featuresData = [
    {
      title: "Blazingly Fast Loading Times",
      body: "This webpage was created using a powerful new framework called Astro."
    },
    {
      title: "Powerful Tools",
      body: "Here, you'll discover incredible tools to enhance your daily life; everything you need on a single website"
    },
    {
      title: "We all know how hard life can get",
      body: "Discover a fresh perspective on life's challenges and find renewed inspiration through our blog's unique insights."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="features" data-astro-cid-vnivfuh2><div class="container" data-astro-cid-vnivfuh2>${featuresData.map((feature) => renderTemplate`${renderComponent($$result, "Card", $$Card, { "dark": false, "data-astro-cid-vnivfuh2": true }, { "default": ($$result2) => renderTemplate`<h3 data-astro-cid-vnivfuh2>${feature.title}</h3><p data-astro-cid-vnivfuh2>${feature.body}</p>` })}`)}</div></section>`;
}, "C:/ZZMisc/Astro/astro-blog/src/components/Features.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Showcase", $$Showcase, { "showExtra": true, "text": "powered by", "data-astro-cid-j7pv25f6": true })}${renderComponent($$result2, "Features", $$Features, { "data-astro-cid-j7pv25f6": true })}${maybeRenderHead()}<section class="page-content" data-astro-cid-j7pv25f6><div class="container" data-astro-cid-j7pv25f6></div></section>` })}`;
}, "C:/ZZMisc/Astro/astro-blog/src/pages/index.astro", void 0);

const $$file = "C:/ZZMisc/Astro/astro-blog/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
