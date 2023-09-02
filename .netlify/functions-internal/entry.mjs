import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_a7c085f0.mjs';
import 'vue';
import 'vue/server-renderer';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import '@astrojs/internal-helpers/path';
import './chunks/astro_c89a7039.mjs';
import 'clsx';
import 'html-escaper';
import 'mime';
import 'path-to-regexp';

const _page0  = () => import('./chunks/image-endpoint_e347199f.mjs');
const _page1  = () => import('./chunks/index_09f05954.mjs');
const _page2  = () => import('./chunks/habit-tracker_b6ba29e8.mjs');
const _page3  = () => import('./chunks/to-do-list_7d7913d7.mjs');
const _page4  = () => import('./chunks/about_f3ade631.mjs');
const _page5  = () => import('./chunks/blog_48123572.mjs');
const _page6  = () => import('./chunks/game_9cc02595.mjs');
const _page7  = () => import('./chunks/_slug__b4b6a02b.mjs');const pageMap = new Map([["node_modules/astro/dist/assets/image-endpoint.js", _page0],["src/pages/index.astro", _page1],["src/pages/habit-tracker.astro", _page2],["src/pages/to-do-list.astro", _page3],["src/pages/about.astro", _page4],["src/pages/blog.astro", _page5],["src/pages/game.astro", _page6],["src/pages/[slug].astro", _page7]]);
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
