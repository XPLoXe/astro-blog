import { joinPaths, isRemotePath } from '@astrojs/internal-helpers/path';
import { A as AstroError, E as ExpectedImage, L as LocalImageUsedWrongly, M as MissingImageDimension, U as UnsupportedImageFormat, I as InvalidImageService, a as ExpectedImageOptions, c as createAstro, b as createComponent, d as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, e as addAttribute, s as spreadAttributes, f as renderComponent, F as Fragment, g as renderHead, h as renderSlot } from '../astro.5e812fb2.mjs';
import 'clsx';
/* empty css                          */import { ssrRenderStyle, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { useSSRContext } from 'vue';
/* empty css                           *//* empty css                            */
const VALID_SUPPORTED_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg"
];

function isLocalService(service) {
  if (!service) {
    return false;
  }
  return "transform" in service;
}
function parseQuality(quality) {
  let result = parseInt(quality);
  if (Number.isNaN(result)) {
    return quality;
  }
  return result;
}
const baseService = {
  validateOptions(options) {
    if (!options.src || typeof options.src !== "string" && typeof options.src !== "object") {
      throw new AstroError({
        ...ExpectedImage,
        message: ExpectedImage.message(JSON.stringify(options.src))
      });
    }
    if (!isESMImportedImage(options.src)) {
      if (options.src.startsWith("/@fs/")) {
        throw new AstroError({
          ...LocalImageUsedWrongly,
          message: LocalImageUsedWrongly.message(options.src)
        });
      }
      let missingDimension;
      if (!options.width && !options.height) {
        missingDimension = "both";
      } else if (!options.width && options.height) {
        missingDimension = "width";
      } else if (options.width && !options.height) {
        missingDimension = "height";
      }
      if (missingDimension) {
        throw new AstroError({
          ...MissingImageDimension,
          message: MissingImageDimension.message(missingDimension, options.src)
        });
      }
    } else {
      if (!VALID_SUPPORTED_FORMATS.includes(options.src.format)) {
        throw new AstroError({
          ...UnsupportedImageFormat,
          message: UnsupportedImageFormat.message(
            options.src.format,
            options.src.src,
            VALID_SUPPORTED_FORMATS
          )
        });
      }
      if (options.src.format === "svg") {
        options.format = "svg";
      }
    }
    if (!options.format) {
      options.format = "webp";
    }
    return options;
  },
  getHTMLAttributes(options) {
    let targetWidth = options.width;
    let targetHeight = options.height;
    if (isESMImportedImage(options.src)) {
      const aspectRatio = options.src.width / options.src.height;
      if (targetHeight && !targetWidth) {
        targetWidth = Math.round(targetHeight * aspectRatio);
      } else if (targetWidth && !targetHeight) {
        targetHeight = Math.round(targetWidth / aspectRatio);
      } else if (!targetWidth && !targetHeight) {
        targetWidth = options.src.width;
        targetHeight = options.src.height;
      }
    }
    const { src, width, height, format, quality, ...attributes } = options;
    return {
      ...attributes,
      width: targetWidth,
      height: targetHeight,
      loading: attributes.loading ?? "lazy",
      decoding: attributes.decoding ?? "async"
    };
  },
  getURL(options, imageConfig) {
    const searchParams = new URLSearchParams();
    if (isESMImportedImage(options.src)) {
      searchParams.append("href", options.src.src);
    } else if (isRemoteAllowed(options.src, imageConfig)) {
      searchParams.append("href", options.src);
    } else {
      return options.src;
    }
    const params = {
      w: "width",
      h: "height",
      q: "quality",
      f: "format"
    };
    Object.entries(params).forEach(([param, key]) => {
      options[key] && searchParams.append(param, options[key].toString());
    });
    const imageEndpoint = joinPaths("/", "/_image");
    return `${imageEndpoint}?${searchParams}`;
  },
  parseURL(url) {
    const params = url.searchParams;
    if (!params.has("href")) {
      return void 0;
    }
    const transform = {
      src: params.get("href"),
      width: params.has("w") ? parseInt(params.get("w")) : void 0,
      height: params.has("h") ? parseInt(params.get("h")) : void 0,
      format: params.get("f"),
      quality: params.get("q")
    };
    return transform;
  }
};

function matchPattern(url, remotePattern) {
  return matchProtocol(url, remotePattern.protocol) && matchHostname(url, remotePattern.hostname, true) && matchPort(url, remotePattern.port) && matchPathname(url, remotePattern.pathname, true);
}
function matchPort(url, port) {
  return !port || port === url.port;
}
function matchProtocol(url, protocol) {
  return !protocol || protocol === url.protocol.slice(0, -1);
}
function matchHostname(url, hostname, allowWildcard) {
  if (!hostname) {
    return true;
  } else if (!allowWildcard || !hostname.startsWith("*")) {
    return hostname === url.hostname;
  } else if (hostname.startsWith("**.")) {
    const slicedHostname = hostname.slice(2);
    return slicedHostname !== url.hostname && url.hostname.endsWith(slicedHostname);
  } else if (hostname.startsWith("*.")) {
    const slicedHostname = hostname.slice(1);
    const additionalSubdomains = url.hostname.replace(slicedHostname, "").split(".").filter(Boolean);
    return additionalSubdomains.length === 1;
  }
  return false;
}
function matchPathname(url, pathname, allowWildcard) {
  if (!pathname) {
    return true;
  } else if (!allowWildcard || !pathname.endsWith("*")) {
    return pathname === url.pathname;
  } else if (pathname.endsWith("/**")) {
    const slicedPathname = pathname.slice(0, -2);
    return slicedPathname !== url.pathname && url.pathname.startsWith(slicedPathname);
  } else if (pathname.endsWith("/*")) {
    const slicedPathname = pathname.slice(0, -1);
    const additionalPathChunks = url.pathname.replace(slicedPathname, "").split("/").filter(Boolean);
    return additionalPathChunks.length === 1;
  }
  return false;
}

function isESMImportedImage(src) {
  return typeof src === "object";
}
function isRemoteImage(src) {
  return typeof src === "string";
}
function isRemoteAllowed(src, {
  domains = [],
  remotePatterns = []
}) {
  if (!isRemotePath(src))
    return false;
  const url = new URL(src);
  return domains.some((domain) => matchHostname(url, domain)) || remotePatterns.some((remotePattern) => matchPattern(url, remotePattern));
}
async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../sharp.76ec33ff.mjs'
    ).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default : options.src
  };
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && // If `getURL` returned the same URL as the user provided, it means the service doesn't need to do anything
  !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions);
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    attributes: service.getHTMLAttributes !== void 0 ? service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$6 = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(image.attributes)}>`;
}, "C:/ZZMisc/Astro/astro-blog/node_modules/astro/components/Image.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					const getImage = async (options) => await getImage$1(options, imageConfig);

const logos = {"src":"/_astro/new-logos.d849bd03.png","width":1684,"height":164,"format":"png"};

const logosSmall = {"src":"/_astro/new-logos-small.55a75cc5.png","width":481,"height":164,"format":"png"};

const $$Astro$5 = createAstro();
const $$Showcase = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Showcase;
  const {
    heading = "Personal Blog",
    text = "",
    showExtra = false,
    showRepository = false,
    repository = ""
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="showcase" data-astro-cid-xyg7ob6d><div class="showcase-text" data-astro-cid-xyg7ob6d><h1 data-astro-cid-xyg7ob6d>${heading}</h1><p data-astro-cid-xyg7ob6d>${text}</p>${showRepository && renderTemplate`<a${addAttribute(repository, "href")} style="color: blueviolet" data-astro-cid-xyg7ob6d>
Git Hub Repository
</a>`}</div>${showExtra && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-xyg7ob6d": true }, { "default": ($$result2) => renderTemplate`<div class="showcase-img" data-astro-cid-xyg7ob6d><div class="image" data-astro-cid-xyg7ob6d><!-- Show this image for large screens and hide for small -->${renderComponent($$result2, "Image", $$Image, { "class": "image hidden lg:inline-block", "id": "logo", "src": logos, "alt": "technologies flyer", "width": "900", "height": "80", "data-astro-cid-xyg7ob6d": true })}<!-- Show this image for small screens and hide for large -->${renderComponent($$result2, "Image", $$Image, { "class": "image inline-block lg:hidden", "id": "logo-small", "src": logosSmall, "alt": "technologies flyer small", "width": "250", "height": "80", "data-astro-cid-xyg7ob6d": true })}</div></div>` })}`}</section>`;
}, "C:/ZZMisc/Astro/astro-blog/src/components/Showcase.astro", void 0);

const logo = {"src":"/_astro/monkey-business.b6acf33d.png","width":386,"height":65,"format":"png"};

const $$Astro$4 = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead()}<header class="header" data-astro-cid-3ef6ksr2><link href="https://fonts.googleapis.com/css?family=Arvo&display=swap" rel="stylesheet"><div class="container" data-astro-cid-3ef6ksr2><div class="image-container" data-astro-cid-3ef6ksr2><a href="index.html" data-astro-cid-3ef6ksr2><img width="75" height="75" src="https://img.icons8.com/nolan/96/year-of-monkey.png" alt="year-of-monkey" data-astro-cid-3ef6ksr2>${renderComponent($$result, "Image", $$Image, { "class": "title", "alt": "logo-title", "src": logo, "data-astro-cid-3ef6ksr2": true })}</a></div><div class="dropdown" style="max-width: 700px; margin: 0 auto" data-astro-cid-3ef6ksr2><nav role="navigation" class="primary-navigation" data-astro-cid-3ef6ksr2><ul data-astro-cid-3ef6ksr2><li data-astro-cid-3ef6ksr2><a href="/" data-astro-cid-3ef6ksr2>Home</a></li><li data-astro-cid-3ef6ksr2><a href="#" data-astro-cid-3ef6ksr2>Games &dtrif;</a><ul class="dropdown" data-astro-cid-3ef6ksr2><li data-astro-cid-3ef6ksr2><a href="/game?search=https://64e50a20839a9019d51bb911--delicate-belekoy-4e9031.netlify.app/" data-astro-cid-3ef6ksr2>Balls of Steel</a></li><li data-astro-cid-3ef6ksr2><a href="/game?search=https://64e88ff4dd8a1c0a6a4fb402--wondrous-cajeta-945cf0.netlify.app/" data-astro-cid-3ef6ksr2>Clicky Crates</a></li></ul></li><li data-astro-cid-3ef6ksr2><a href="#" data-astro-cid-3ef6ksr2>Tools &dtrif;</a><ul class="dropdown" data-astro-cid-3ef6ksr2><li data-astro-cid-3ef6ksr2><a href="/to-do-list" data-astro-cid-3ef6ksr2>To Do List</a></li><li data-astro-cid-3ef6ksr2><a href="/habit-tracker" data-astro-cid-3ef6ksr2>Habit Tracker</a></li></ul></li><li data-astro-cid-3ef6ksr2><a href="/about" data-astro-cid-3ef6ksr2>About</a></li><li data-astro-cid-3ef6ksr2><a href="/blog" data-astro-cid-3ef6ksr2>Blog</a></li></ul></nav></div></div></header>`;
}, "C:/ZZMisc/Astro/astro-blog/src/components/Header.astro", void 0);

const $$Astro$3 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="footer" data-astro-cid-sz7xmlte><div class="container" data-astro-cid-sz7xmlte><div data-astro-cid-sz7xmlte><p data-astro-cid-sz7xmlte>
If any bug is encountered, please feel free to check the code and
        request a pull in the <a href="https://github.com/XPLoXe/astro-blog" data-astro-cid-sz7xmlte>GitHub repository</a></p><p data-astro-cid-sz7xmlte>
or have the liberty of reaching me via my personal <a href="mailto: aleb2800@gmail.com" data-astro-cid-sz7xmlte>e-mail</a></p></div><div data-astro-cid-sz7xmlte><h3 data-astro-cid-sz7xmlte>Links</h3><ul data-astro-cid-sz7xmlte><li data-astro-cid-sz7xmlte><a href="/" data-astro-cid-sz7xmlte>Home</a></li><li data-astro-cid-sz7xmlte><a href="/about" data-astro-cid-sz7xmlte>About</a></li><li data-astro-cid-sz7xmlte><a href="/blog" data-astro-cid-sz7xmlte>Blog</a></li></ul></div></div></footer>`;
}, "C:/ZZMisc/Astro/astro-blog/src/components/Footer.astro", void 0);

const $$Astro$2 = createAstro();
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "C:/ZZMisc/Astro/astro-blog/node_modules/astro/components/ViewTransitions.astro", void 0);

const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title = "Monkey Business" } = Astro2.props;
  return renderTemplate`<html lang="en"><head><link rel="icon" type="image/x-icon" href="https://img.icons8.com/nolan/96/year-of-monkey.png"><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta property="og:image" content="https://img.icons8.com/nolan/96/year-of-monkey.png"><meta property="og:title" content="Monkey Business"><meta property="og:description" content="A wild <em>Random Personal Blog</em> appeared"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer"><link href="/dist/output.css" rel="stylesheet"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer"><title>${title}</title>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}${renderHead()}</head><body class="flex flex-col min-h-screen font-Roboto">${renderComponent($$result, "Header", $$Header, {})}${renderSlot($$result, $$slots["default"])}${renderComponent($$result, "Footer", $$Footer, {})}</body></html>`;
}, "C:/ZZMisc/Astro/astro-blog/src/layouts/Layout.astro", void 0);

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

export { $$Showcase as $, _export_sfc as _, isRemoteAllowed as a, $$Layout as b, logosSmall as c, baseService as d, game as e, getConfiguredImageService as g, imageConfig as i, logos as l, parseQuality as p };
