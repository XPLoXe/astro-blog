import { joinPaths, isRemotePath } from '@astrojs/internal-helpers/path';
import { A as AstroError, E as ExpectedImage, L as LocalImageUsedWrongly, M as MissingImageDimension, U as UnsupportedImageFormat, I as InvalidImageService, a as ExpectedImageOptions, c as createAstro, b as createComponent, d as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, e as addAttribute, s as spreadAttributes, f as renderSlot, g as renderComponent, h as renderHead } from '../astro_c89a7039.mjs';
import 'clsx';
/* empty css                          *//* empty css                            *//* empty css                           */
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
      '../sharp_9b8fda12.mjs'
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

const $$Astro$5 = createAstro();
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Card;
  const { dark = false, text = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`card ${dark && "dark"}`, "class")} data-astro-cid-dohjnao5>${renderSlot($$result, $$slots["default"], renderTemplate`${text}`)}</div>`;
}, "C:/ZZMisc/Astro/astro-blog/src/components/Card.astro", void 0);

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
        request a pull in the
<a href="https://github.com/XPLoXe/astro-blog" data-astro-cid-sz7xmlte> GitHub repository </a><i class="fa-brands fa-github" data-astro-cid-sz7xmlte></i></p><p data-astro-cid-sz7xmlte>
or have the liberty of reaching me via my personal <a href="mailto: aleb2800@gmail.com" data-astro-cid-sz7xmlte>e-mail </a><i class="fa-solid fa-envelope" data-astro-cid-sz7xmlte></i></p></div><div data-astro-cid-sz7xmlte><h3 data-astro-cid-sz7xmlte>Links</h3><ul data-astro-cid-sz7xmlte><li data-astro-cid-sz7xmlte><a href="/" data-astro-cid-sz7xmlte>Home</a></li><li data-astro-cid-sz7xmlte><a href="/about" data-astro-cid-sz7xmlte>About</a></li><li data-astro-cid-sz7xmlte><a href="/blog" data-astro-cid-sz7xmlte>Blog</a></li></ul></div></div></footer>`;
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

const $$Astro = createAstro();
const Astro = $$Astro;
async function getStaticPaths() {
  const posts = await Astro.glob(/* #__PURE__ */ Object.assign({"../posts/2023-08-24.md": () => import('../2023-08-24_ca84a0c9.mjs')}), () => "../posts/*.md");
  return posts.map((post) => ({
    params: {
      slug: post.frontmatter.slug
    },
    props: {
      post
    }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { Content, frontmatter } = Astro2.props.post;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": frontmatter.title }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<section class="page-content"><div class="container">${renderComponent($$result2, "Card", $$Card, {}, { "default": ($$result3) => renderTemplate`<a class="btn" href="/blog">Go Back</a><h2 class="py-6 text-4xl text-center">${frontmatter.title}</h2><div><i>
Written by <strong>${frontmatter.author}</strong> on
${new Date(frontmatter.date).toLocaleDateString()}</i></div><div class="py-6">${renderComponent($$result3, "Content", Content, {})}</div><a class="btn" href="/blog">Go Back</a>` })}</div></section>` })}`;
}, "C:/ZZMisc/Astro/astro-blog/src/pages/[slug].astro", void 0);

const $$file = "C:/ZZMisc/Astro/astro-blog/src/pages/[slug].astro";
const $$url = "/[slug]";

const _slug_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Image as $, _slug_ as _, $$Layout as a, $$Card as b, isRemoteAllowed as c, baseService as d, getConfiguredImageService as g, imageConfig as i, parseQuality as p };
