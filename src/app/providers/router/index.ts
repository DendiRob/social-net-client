import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { useSessionStore } from 'entities/session/model';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to) => {
  const viewerStore = useSessionStore();

  if (to.name === 'login') return;

  if (viewerStore.isAuth) return;

  await viewerStore.getViewer();

  if (viewerStore.isAuth) return;

  return { name: 'login' };
});

export { router };
