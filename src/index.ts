import App from 'App.vue';
import useComponents from 'components/_index.js';
import { createPinia } from 'pinia';
import usePlagins from 'plugins';
import router from 'router';
import { createApp } from 'vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);

usePlagins(app);
useComponents(app);

app.mount('#app');
