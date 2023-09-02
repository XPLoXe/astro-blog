import { c as createAstro, b as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, g as renderComponent, F as Fragment } from '../astro_c89a7039.mjs';
import 'clsx';
import { $ as $$Image, a as $$Layout } from './_slug__73b7ba41.mjs';
import '@astrojs/internal-helpers/path';
/* empty css                           *//* empty css                           */
const logos = {"src":"/_astro/new-logos.d849bd03.png","width":1684,"height":164,"format":"png"};

const logosSmall = {"src":"/_astro/new-logos-small.55a75cc5.png","width":481,"height":164,"format":"png"};

const $$Astro$1 = createAstro();
const $$Showcase = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Showcase;
  const {
    heading = "Personal Blog",
    text = "",
    showExtra = false,
    showRepository = false,
    repository = ""
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="showcase" data-astro-cid-xyg7ob6d><div class="showcase-text" data-astro-cid-xyg7ob6d><h1 data-astro-cid-xyg7ob6d>${heading}</h1><p data-astro-cid-xyg7ob6d>${text}</p>${showRepository && renderTemplate`<i class="fa-brands fa-github" data-astro-cid-xyg7ob6d></i><a${addAttribute(repository, "href")} style="color: rgb(183, 0, 255)" data-astro-cid-xyg7ob6d>
Git Hub Repository
</a>`}</div>${showExtra && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-xyg7ob6d": true }, { "default": ($$result2) => renderTemplate`<div class="showcase-img" data-astro-cid-xyg7ob6d><div class="image" data-astro-cid-xyg7ob6d><!-- Show this image for large screens and hide for small -->${renderComponent($$result2, "Image", $$Image, { "class": "image hidden lg:inline-block", "id": "logo", "src": logos, "alt": "technologies flyer", "width": "900", "height": "80", "data-astro-cid-xyg7ob6d": true })}<!-- Show this image for small screens and hide for large -->${renderComponent($$result2, "Image", $$Image, { "class": "image inline-block lg:hidden", "id": "logo-small", "src": logosSmall, "alt": "technologies flyer small", "width": "250", "height": "80", "data-astro-cid-xyg7ob6d": true })}</div></div>` })}`}</section>`;
}, "C:/ZZMisc/Astro/astro-blog/src/components/Showcase.astro", void 0);

const $$Astro = createAstro();
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "About Astro", "data-astro-cid-kh7btl4r": true }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Showcase", $$Showcase, { "heading": "About", "data-astro-cid-kh7btl4r": true })}${maybeRenderHead()}<section class="page-content" data-astro-cid-kh7btl4r><div class="container" style="text-justify: auto; text-align: center" data-astro-cid-kh7btl4r><h2 data-astro-cid-kh7btl4r>About This Blog</h2><p data-astro-cid-kh7btl4r>
On a day like any other, you veer from life’s culturally-designated path
        and realize that a world of opportunities lies just ahead. It may sound
        like a passage from a children’s book meant to inspire courage, but in
        reality, this realization is one of the most unsettling you will ever
        experience.
</p><p data-astro-cid-kh7btl4r>
In this humble blog, you will find the tools from which I have crafted
        the ark I use to navigate through the sea of life. It may not be a lot,
        but it will grow alongside my web developer skills and my experiences
        while playing life itself.
</p><div style="width: 100%; display: flex; justify-content: center;" data-astro-cid-kh7btl4r><div style="width: 75%; height: 0; padding-bottom: 66%; position: relative;" data-astro-cid-kh7btl4r><iframe src="https://giphy.com/embed/VHTUhqI82ZgPK?rid=no_related" width="75%" height="75%" style="position: absolute; left: 0; right: 0; margin: auto;" frameborder="0" class="giphy-embed" data-astro-cid-kh7btl4r></iframe></div></div></div><div class="flex flex-1 flex-col items-center" data-astro-cid-kh7btl4r><div class="image" data-astro-cid-kh7btl4r><!-- Show this image for large screens and hide for small -->${renderComponent($$result2, "Image", $$Image, { "class": "image hidden lg:inline-block", "id": "logo", "src": logos, "alt": "technologies flyer", "width": "900", "height": "80", "data-astro-cid-kh7btl4r": true })}<!-- Show this image for small screens and hide for large -->${renderComponent($$result2, "Image", $$Image, { "class": "image inline-block lg:hidden", "id": "logo-small", "src": logosSmall, "alt": "technologies flyer small", "width": "250", "height": "80", "data-astro-cid-kh7btl4r": true })}</div></div></section>` })}`;
}, "C:/ZZMisc/Astro/astro-blog/src/pages/about.astro", void 0);

const $$file = "C:/ZZMisc/Astro/astro-blog/src/pages/about.astro";
const $$url = "/about";

const about = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Showcase as $, about as a };
