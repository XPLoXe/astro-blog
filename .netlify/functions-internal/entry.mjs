import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_8412cc17.mjs';
import 'vue';
import 'vue/server-renderer';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import '@astrojs/internal-helpers/path';
import './chunks/astro_91e07efc.mjs';
import 'clsx';
import 'html-escaper';
import 'mime';
import 'path-to-regexp';

const _page0  = () => import('./chunks/image-endpoint_c221f86c.mjs');
const _page1  = () => import('./chunks/index_fd636dee.mjs');
const _page2  = () => import('./chunks/habit-tracker_d68d51db.mjs');
const _page3  = () => import('./chunks/to-do-list_7ac5ef72.mjs');
const _page4  = () => import('./chunks/about_b174cafc.mjs');
const _page5  = () => import('./chunks/blog_690c56bc.mjs');
const _page6  = () => import('./chunks/game_57514da3.mjs');
const _page7  = () => import('./chunks/_slug__6972fd28.mjs');const pageMap = new Map([["node_modules/astro/dist/assets/image-endpoint.js", _page0],["src/pages/index.astro", _page1],["src/pages/habit-tracker.astro", _page2],["src/pages/to-do-list.astro", _page3],["src/pages/about.astro", _page4],["src/pages/blog.astro", _page5],["src/pages/game.astro", _page6],["src/pages/[slug].astro", _page7]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap };
