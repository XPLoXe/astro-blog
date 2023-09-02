export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';
import 'vue';
import 'vue/server-renderer';

const page = () => import('./pages/image-endpoint_8ab55978.mjs');

export { page };
