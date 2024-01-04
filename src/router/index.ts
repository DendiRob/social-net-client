import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('layouts/DefaultLayout.vue'),
      children: [
        {
          path: '/',
          components: {
            default: () => import('pages/contacts/ContactsPage.vue'),
            sidebar: () => import('pages/contacts/ContactsSidebar.vue')
          }
        },
        {
          path: '/chats',
          name: 'chats',
          components: {
            // default: () => import('../pages/contacts/ContactsPage.vue'),
            // sidebar: () => import('../pages/contacts/ContactsSidebar.vue')
          }
        },
        {
          path: '/posts',
          name: 'posts',
          components: {
            // default: () => import('../pages/contacts/ContactsPage.vue'),
            // sidebar: () => import('../pages/contacts/ContactsSidebar.vue')
          }
        }
      ]
    },
    {
      path: '/registration',
      name: 'reg',
      component: () => import('pages/registration/RegistrationPage.vue')
    }
  ]
});

export default router;
