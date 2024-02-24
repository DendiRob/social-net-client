import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { SessionModel } from 'entities/session';
import { UserModel } from 'entities/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to) => {
  const sessionStore = SessionModel.useSessionStore();
  const userStore = UserModel.useUserStore();

  await sessionStore.getViewer();

  if (to.name === 'login' && !sessionStore.isAuth) return;
  if (to.name === 'reg' && !sessionStore.isAuth) return;

  userStore.userUrlHistory = to.fullPath;

  if (to.name === 'login' && sessionStore.isAuth) return { name: 'home' };
  if (to.name === 'reg' && sessionStore.isAuth) return { name: 'home' };

  if (sessionStore.isAuth) return;

  return { name: 'login' };
});

export { router };
