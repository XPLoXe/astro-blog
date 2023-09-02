import { c as createAstro, b as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead } from '../astro_c89a7039.mjs';
import 'clsx';
/* empty css                          */import { ssrRenderStyle, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { useSSRContext } from 'vue';
import { $ as $$Showcase } from './about_f0b10ba6.mjs';
import { a as $$Layout } from './_slug__73b7ba41.mjs';

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const _sfc_main = {
  name: "unity",
  data() {
    return {
      url: "",
      desc: "",
      title: "",
    };
  },
  methods: {
    getDesc() {
      if (
        this.url ===
        "https://64e50a20839a9019d51bb911--delicate-belekoy-4e9031.netlify.app/"
      ) {
        this.title = "Balls of Steel";
        this.desc =
          "This game holds a profound attachment for me. It began as a playful prototype while I tested some Unity mechanics, and before long, I was fully immersed in it, consistently releasing updates. The game's growth took off when I shared it with friends, and their enjoyment, along with their suggestions for improvements, motivated me. One by one, I implemented their advice, enhancing the game with updates and new features. Soon after, a couple of musician friends were so impressed that they offered to create the game's music and sounds, and you can find their names in the game's credits within the menu.";
      }
      if (
        this.url ===
        "https://64e88ff4dd8a1c0a6a4fb402--wondrous-cajeta-945cf0.netlify.app/"
      ) {
        this.title = "Clicky Crate";
        this.desc =
          "While practicing scripts in the Junior Unity Programmer Pathway, I developed this game and felt it would be a missed opportunity not to preserve and utilize it.";
      }
    },
  },
  // Vue component options
  mounted() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(params);
    this.url = params.search;
    console.log(this.url);
    this.getDesc();
    //https://64e50a20839a9019d51bb911--delicate-belekoy-4e9031.netlify.app/
  },
};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><div style="${
    ssrRenderStyle({"display":"grid","place-items":"center"})
  }"><iframe id="webgl_iframe" frameborder="0" allow="fullscreen; vr" allowfullscreen="" allowvr="" mozallowfullscreen="true"${
    ssrRenderAttr("src", $data.url)
  } width="1000" height="700" onmousewheel="" webkitallowfullscreen="true"></iframe></div><div class="container"><h3 style="${
    ssrRenderStyle({"text-align":"center"})
  }">${
    ssrInterpolate($data.title)
  }</h3><p style="${
    ssrRenderStyle({"text-justify":"auto","text-align":"center"})
  }">${
    ssrInterpolate($data.desc)
  }</p></div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/components/Unity.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const Unity = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const $$Astro = createAstro();
const prerender = false;
const $$Game = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Game;
  const { currentPath = Astro2.url.searchParams } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blog" }, { "default": ($$result2) => renderTemplate`${currentPath.toString() === "search=https%3A%2F%2F64e50a20839a9019d51bb911--delicate-belekoy-4e9031.netlify.app%2F" && renderTemplate`${renderComponent($$result2, "Showcase", $$Showcase, { "heading": "Balls of Steel", "text": "Remain the sole ball on the platform", "repository": "https://github.com/XPLoXe/Balls-of-Steel", "showRepository": true })}`}${currentPath.toString() === "search=https%3A%2F%2F64e88ff4dd8a1c0a6a4fb402--wondrous-cajeta-945cf0.netlify.app%2F" && renderTemplate`${renderComponent($$result2, "Showcase", $$Showcase, { "heading": "Clicky Crates", "text": "Click as many crates as you can. Watch out for the skulls", "repository": "https://github.com/XPLoXe/clicky-crates", "showRepository": true })}`}${maybeRenderHead()}<section class="page-content">${renderComponent($$result2, "Unity", Unity, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/ZZMisc/Astro/astro-blog/src/components/Unity.vue", "client:component-export": "default" })}</section>` })}`;
}, "C:/ZZMisc/Astro/astro-blog/src/pages/game.astro", void 0);

const $$file = "C:/ZZMisc/Astro/astro-blog/src/pages/game.astro";
const $$url = "/game";

const game = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Game,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { _export_sfc as _, game as g };
