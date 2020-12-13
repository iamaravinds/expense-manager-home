import Login from '../pages/Login.vue';
const routes = [
    {
      path: '/',
      redirect: { name: 'Login' }
    },
    {
      path: '/about',
      name: 'About',
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
    },
    {
      path: '/records',
      name: 'Records',
      component: () => import(/* webpackChunkName: "records" */ '../views/Records.vue')
    },
    {
      path: '/budget',
      name: 'Budget',
      component: () => import(/* webpackChunkName: "records" */ '../views/Budget.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
  export default routes; 