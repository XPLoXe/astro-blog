export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';
import 'vue';
import 'vue/server-renderer';

const page = () => import('./pages/about_f0b10ba6.mjs').then(n => n.a);

export { page };
