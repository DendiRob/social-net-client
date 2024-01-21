import App from './App.vue';
import { createPinia } from 'pinia';
import { usePlugins } from 'app/providers';
import { router } from 'app/providers';
import { createApp } from 'vue';

const app = createApp(App).use(createPinia()).use(router);

usePlugins(app);

export default app;
