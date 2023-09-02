import 'cookie';
import 'kleur/colors';
import 'string-width';
import '@astrojs/internal-helpers/path';
import './chunks/astro_91e07efc.mjs';
import 'clsx';
import 'mime';
import { compile } from 'path-to-regexp';
import 'html-escaper';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

new TextEncoder();

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"_meta":{"trailingSlash":"ignore"}}},{"file":"habit-tracker/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/habit-tracker","type":"page","pattern":"^\\/habit-tracker\\/?$","segments":[[{"content":"habit-tracker","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/habit-tracker.astro","pathname":"/habit-tracker","prerender":true,"_meta":{"trailingSlash":"ignore"}}},{"file":"to-do-list/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/to-do-list","type":"page","pattern":"^\\/to-do-list\\/?$","segments":[[{"content":"to-do-list","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/to-do-list.astro","pathname":"/to-do-list","prerender":true,"_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog.astro","pathname":"/blog","prerender":true,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/image-endpoint.js","pathname":"/_image","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.1a56ad47.js"}],"styles":[{"type":"inline","content":":root{--color-primary: #0f172a;--color-secondary: #6b21a8}*,*:before,*:after{box-sizing:border-box;margin:0;padding:0}body{font-family:Roboto,sans-serif;font-size:16px;line-height:1.5;background:#f8fafc;color:#333}a{text-decoration:none;color:#333}p{margin:1rem 0}ul{list-style:none}li{line-height:2}h1,h2,h3{line-height:1.2}.container{max-width:1200px;margin:0 auto;padding:0 30px}.btn{display:inline-block;padding:.5rem 1rem;border-radius:5px;background:#333;color:#fff;text-transform:uppercase;font-size:.8rem;letter-spacing:1px;transition:all .3s ease}.logos-small{display:none}.page-content,.page-content h2,.page-content h3{margin:20px 0}.page-content h2{font-size:40px}.page-content h3{font-size:25px}.glow-element{width:100px;height:50px;background-color:#320036;color:#fff;text-align:center;line-height:50px;cursor:pointer;transition:box-shadow .3s ease}.glow-element:hover{box-shadow:0 0 20px 5px #9f04c9}.glow-text{font-size:24px;color:#333;transition:text-shadow .3s ease}.glow-text:hover{text-shadow:0 0 10px #9f04c9}.glow-circle{width:100px;height:100px;background-color:#333;border-radius:50%;transition:box-shadow .3s ease}.glow-circle:hover{box-shadow:0 0 20px 10px #9f04c9}@media (max-width: 960px){.logos-small{display:block;margin:auto}.logos{display:none}}@media (max-width: 500px){h1,h2{text-align:center}}\n"},{"type":"external","src":"/_astro/_slug_.a83256ef.css"},{"type":"inline","content":"a[data-astro-cid-xyg7ob6d]{color:#a741ff}a[data-astro-cid-xyg7ob6d]:hover{text-decoration:underline}.showcase[data-astro-cid-xyg7ob6d]{height:auto;background-color:var(--color-secondary);background-image:linear-gradient(to bottom,var(--color-primary),rgb(15 23 42 / 0));padding:30px}.showcase-blog[data-astro-cid-xyg7ob6d]{min-height:300px}.showcase-text[data-astro-cid-xyg7ob6d]{max-width:700px;color:#fff;text-align:center;margin:50px auto}.showcase[data-astro-cid-xyg7ob6d] h1[data-astro-cid-xyg7ob6d]{font-size:50px;color:#fff;margin-bottom:20px}.showcase[data-astro-cid-xyg7ob6d] p[data-astro-cid-xyg7ob6d]{font-size:24px;margin-bottom:20px}.showcase-img[data-astro-cid-xyg7ob6d]{text-align:center}.showcase-img[data-astro-cid-xyg7ob6d] .image[data-astro-cid-xyg7ob6d]{border-radius:10px;margin:auto}.showcase-demo[data-astro-cid-xyg7ob6d]{color:#fff;text-align:center;font-weight:300}.logo-small[data-astro-cid-xyg7ob6d]{display:0}\n"}],"routeData":{"route":"/game","type":"page","pattern":"^\\/game\\/?$","segments":[[{"content":"game","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/game.astro","pathname":"/game","prerender":false,"_meta":{"trailingSlash":"ignore"}}}],"base":"/","compressHTML":true,"componentMetadata":[["C:/ZZMisc/Astro/astro-blog/src/pages/[slug].astro",{"propagation":"none","containsHead":true}],["C:/ZZMisc/Astro/astro-blog/src/pages/about.astro",{"propagation":"none","containsHead":true}],["C:/ZZMisc/Astro/astro-blog/src/pages/blog.astro",{"propagation":"none","containsHead":true}],["C:/ZZMisc/Astro/astro-blog/src/pages/game.astro",{"propagation":"none","containsHead":true}],["C:/ZZMisc/Astro/astro-blog/src/pages/habit-tracker.astro",{"propagation":"none","containsHead":true}],["C:/ZZMisc/Astro/astro-blog/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/ZZMisc/Astro/astro-blog/src/pages/to-do-list.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,n)=>{let s=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),s();break}});for(let e of n.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000empty-middleware":"_empty-middleware.mjs","/node_modules/astro/dist/assets/image-endpoint.js":"chunks/pages/image-endpoint_a002e8c8.mjs","\u0000@astrojs-manifest":"manifest_8412cc17.mjs","\u0000@astro-page:node_modules/astro/dist/assets/image-endpoint@_@js":"chunks/image-endpoint_c221f86c.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_fd636dee.mjs","\u0000@astro-page:src/pages/habit-tracker@_@astro":"chunks/habit-tracker_d68d51db.mjs","\u0000@astro-page:src/pages/to-do-list@_@astro":"chunks/to-do-list_7ac5ef72.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_b174cafc.mjs","\u0000@astro-page:src/pages/blog@_@astro":"chunks/blog_690c56bc.mjs","\u0000@astro-page:src/pages/game@_@astro":"chunks/game_57514da3.mjs","\u0000@astro-page:src/pages/[slug]@_@astro":"chunks/_slug__6972fd28.mjs","C:/ZZMisc/Astro/astro-blog/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_93886fa8.mjs","C:/ZZMisc/Astro/astro-blog/src/posts/2023-08-24.md":"chunks/2023-08-24_1c00553a.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.07754bf0.js","C:/ZZMisc/Astro/astro-blog/src/components/HabitTracker.vue":"_astro/HabitTracker.29725ffe.js","C:/ZZMisc/Astro/astro-blog/src/components/Unity.vue":"_astro/Unity.50a56539.js","C:/ZZMisc/Astro/astro-blog/src/components/ToDoList.vue":"_astro/ToDoList.aead8791.js","@astrojs/vue/client.js":"_astro/client.3cd8fba8.js","/astro/hoisted.js?q=0":"_astro/hoisted.1a56ad47.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/new-logos-small.55a75cc5.png","/_astro/new-logos.d849bd03.png","/_astro/monkey-business.b6acf33d.png","/_astro/_slug_.a83256ef.css","/favicon.svg","/_astro/client.3cd8fba8.js","/_astro/confetti.module.249a7e39.js","/_astro/HabitTracker.29725ffe.js","/_astro/hoisted.07754bf0.js","/_astro/hoisted.1a56ad47.js","/_astro/runtime-core.esm-bundler.d7af5174.js","/_astro/runtime-dom.esm-bundler.b3df1fa7.js","/_astro/ToDoList.aead8791.js","/_astro/Unity.50a56539.js","/_astro/_plugin-vue_export-helper.c27b6911.js","/index.html","/habit-tracker/index.html","/to-do-list/index.html","/about/index.html","/blog/index.html"]});

export { manifest };
