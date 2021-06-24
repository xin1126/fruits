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
        path: 'from',
        component: () => import('../views/frontend/CartFrom.vue'),
      },
      {
        path: 'checkout',
        component: () => import('../views/frontend/CheckoutPayment.vue'),
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
    path: '/backstage',
    component: () => import('../views/backend/Layout.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backend/Products.vue'),
      },
      {
        path: 'order',
        component: () => import('../views/backend/Order.vue'),
      },
      {
        path: 'coupon',
        component: () => import('../views/backend/Coupon.vue'),
      },
      {
        path: 'article',
        component: () => import('../views/backend/Article.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/backend/Login.vue'),
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
