import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import usePlagins from './plugins';
import useComponents from './components/_index.js';

import './styles/style.scss';

const app = createApp(App)

app.use(createPinia())
app.use(router)

usePlagins(app)
useComponents(app)

app.mount('#app')
