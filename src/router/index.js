import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta';

import routes from './routes';
// import hooks from './router.hooks';

Vue.use(VueRouter)
Vue.use(Meta);

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});
// router.beforeEach(hooks);

export default router
