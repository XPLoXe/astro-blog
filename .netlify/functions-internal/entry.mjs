import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest.5984e1c6.mjs';
import 'vue';
import 'vue/server-renderer';
import 'cookie';
import 'kleur/colors';
import 'string-width';
import '@astrojs/internal-helpers/path';
import './chunks/astro.5e812fb2.mjs';
import 'clsx';
import 'html-escaper';
import 'mime';
import 'path-to-regexp';

const _page0  = () => import('./chunks/image-endpoint@_@js.015102a5.mjs');
const _page1  = () => import('./chunks/index@_@astro.988e96b2.mjs');
const _page2  = () => import('./chunks/habit-tracker@_@astro.393203a4.mjs');
const _page3  = () => import('./chunks/to-do-list@_@astro.bf6199fb.mjs');
const _page4  = () => import('./chunks/about@_@astro.7406f7e8.mjs');
const _page5  = () => import('./chunks/blog@_@astro.0f04d255.mjs');
const _page6  = () => import('./chunks/game@_@astro.f76109b7.mjs');
const _page7  = () => import('./chunks/_slug_@_@astro.68a173b6.mjs');const pageMap = new Map([["node_modules/astro/dist/assets/image-endpoint.js", _page0],["src/pages/index.astro", _page1],["src/pages/habit-tracker.astro", _page2],["src/pages/to-do-list.astro", _page3],["src/pages/about.astro", _page4],["src/pages/blog.astro", _page5],["src/pages/game.astro", _page6],["src/pages/[slug].astro", _page7]]);
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
