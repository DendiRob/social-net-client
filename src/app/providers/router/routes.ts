import profileRoutes from 'entities/profile/profile.routes';

export const routes = [
  {
    path: '/',
    component: () => import('pages/layout'),
    children: [
      {
        path: '/',
        name: 'home',
        components: {
          default: () => import('pages/contacts/ui/ContactsPage'),
          sidebar: () => import('pages/contacts/ui/ContactsSidebar')
        }
      },
      {
        path: '/chats',
        name: 'chats',
        components: {
          default: () => import('pages/chats/ui/ChatsPage'),
          sidebar: () => import('pages/chats/ui/ChatsSidebar')
        }
      },
      {
        path: '/posts',
        name: 'posts',
        components: {
          default: () => import('pages/posts/ui/PostsPage'),
          sidebar: () => import('pages/posts/ui/PostsSidebar')
        }
      },
      {
        path: '/settings',
        name: 'settings',
        children: profileRoutes
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
