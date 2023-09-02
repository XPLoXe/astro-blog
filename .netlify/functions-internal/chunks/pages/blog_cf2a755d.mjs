import { c as createAstro, b as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead, e as addAttribute } from '../astro_c89a7039.mjs';
import { b as $$Card, a as $$Layout } from './_slug__73b7ba41.mjs';
import { $ as $$Showcase } from './about_f0b10ba6.mjs';
import 'clsx';
import 'html-escaper';
import '@astrojs/internal-helpers/path';
/* empty css                          *//* empty css                            *//* empty css                           *//* empty css                           *//* empty css                           */
const $$Astro = createAstro();
const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Blog;
  const posts = await Astro2.glob(/* #__PURE__ */ Object.assign({"../posts/2023-08-24.md": () => import('../2023-08-24_ca84a0c9.mjs')}), () => "../posts/*.md");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog" }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Showcase", $$Showcase, { "heading": "Blog Binnacle", "text": "A few posts explaining interesting stuff" })}${maybeRenderHead()}<section class="page-content"><div class="container">${posts.map((post) => renderTemplate`${renderComponent($$result2, "Card", $$Card, {}, { "default": ($$result3) => renderTemplate`<h3>${post.frontmatter.title}</h3><div>
Written by <strong>${post.frontmatter.author}</strong> on
${new Date(post.frontmatter.date).toLocaleDateString()}</div><br><p>${post.frontmatter.excerpt}</p><br><a class="btn"${addAttribute(`/${post.frontmatter.slug}`, "href")}>
Read More
</a>` })}`)}</div></section>` })}`;
}, "C:/ZZMisc/Astro/astro-blog/src/pages/blog.astro", void 0);

const $$file = "C:/ZZMisc/Astro/astro-blog/src/pages/blog.astro";
const $$url = "/blog";

export { $$Blog as default, $$file as file, $$url as url };
