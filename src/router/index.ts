import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
    {
      path: '/',
      name: 'dashboard',
      // The browser doesn't need to download the page code until the user actually navigates there.
      component: () => import('../components/pages/DashboardPage.vue'),
    },

    {
      path: '/shows/:id',
      name: 'show-detail',
      component: () => import('../components/pages/ShowDetailPage.vue'),
    },
  ],
});

export default router