import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/frontend/Layout.vue'),
    children: [
      {
        path: 'home',
        component: () => import('../views/frontend/Home.vue'),
      },
      {
        path: '',
        component: () => import('../views/frontend/Products.vue'),
      },
      {
        path: 'about',
        component: () => import('../views/frontend/About.vue'),
      },
      {
        path: 'faq',
        component: () => import('../views/frontend/CommonProblem.vue'),
      },
      {
        path: 'carts',
        component: () => import('../views/frontend/Carts.vue'),
      },
      {
        path: 'favorites',
        component: () => import('../views/frontend/Favorites.vue'),
      },
      {
        path: 'detailed/:id',
        component: () => import('../views/frontend/Detailed.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/backstage',
    component: () => import('../views/Backstage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/frontend/Layout.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/frontend/Products.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
