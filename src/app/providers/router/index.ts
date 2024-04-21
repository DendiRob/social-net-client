import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { SessionModel } from 'entities/session';
import { UserModel } from 'entities/user';
import { profileModel } from 'entities/profile';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to) => {
  const sessionStore = SessionModel.useSessionStore();
  const userStore = UserModel.useUserStore();
  const profileStore = profileModel.useProfileStore();

  if (to.name === 'login' && !sessionStore.isAuth) return;
  if (to.name === 'reg' && !sessionStore.isAuth) return;

  await sessionStore.getViewer();

  if (to.name === 'profile-editing') await profileStore.getUserProfile();

  userStore.userUrlHistory = to.fullPath;

  if (to.name === 'login' && sessionStore.isAuth) return { name: 'home' };
  if (to.name === 'reg' && sessionStore.isAuth) return { name: 'home' };

  if (sessionStore.isAuth) return;

  return { name: 'login' };
});

export { router };
