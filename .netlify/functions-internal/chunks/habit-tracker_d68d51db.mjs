export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';
import 'vue';
import 'vue/server-renderer';

const page = () => import('./prerender_14f24968.mjs').then(n => n.h);

export { page };
