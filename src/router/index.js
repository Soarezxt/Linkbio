import { createRouter, createWebHistory } from 'vue-router';
import Links from '../views/Links.vue';

const routes = [
  {
    path: '/links',
    name: 'Links',
    component: Links,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
