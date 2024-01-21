export const routes = [
  {
    path: '/',
    component: () => import('pages/layout'),
    children: [
      {
        path: '/',
        components: {
          default: () => import('pages/contacts/ui/ContactsPage'),
          sidebar: () => import('pages/contacts/ui/ContactsSidebar')
        }
      },
      {
        path: '/chats',
        name: 'chats',
        components: {
          default: () => import('pages/contacts/ui/ContactsPage'),
          sidebar: () => import('pages/contacts/ui/ContactsSidebar')
        }
      },
      {
        path: '/posts',
        name: 'posts',
        components: {
          default: () => import('pages/contacts/ui/ContactsPage'),
          sidebar: () => import('pages/contacts/ui/ContactsSidebar')
        }
      }
    ]
  },
  {
    path: '/registration',
    name: 'reg',
    component: () => import('pages/registration')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/login')
  }
];
