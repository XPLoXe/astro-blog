export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';
import 'vue';
import 'vue/server-renderer';

const page = () => import('./pages/game_ef61b94c.mjs').then(n => n.f);

export { page };
