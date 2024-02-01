import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { SessionModel } from 'entities/session';
import { UserModel } from 'entities/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to) => {
  const viewerStore = SessionModel.useSessionStore();
  const userStore = UserModel.useUserStore();

  userStore.userUrlHistory = to.fullPath;

  await viewerStore.getViewer();

  if (to.name === 'login' && !viewerStore.isAuth) return;
  if (to.name === 'reg' && !viewerStore.isAuth) return;

  if (to.name === 'login' && viewerStore.isAuth) return { name: 'home' };
  if (to.name === 'reg' && viewerStore.isAuth) return { name: 'home' };

  if (viewerStore.isAuth) return;

  return { name: 'login' };
});

export { router };
