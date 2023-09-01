export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';
import 'vue';
import 'vue/server-renderer';

const page = () => import('./pages/game.astro.16f762b1.mjs').then(n => n.e);

export { page };
