export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';
import 'vue';
import 'vue/server-renderer';

const page = () => import('./prerender.e0d2848c.mjs').then(n => n.h);

export { page };
