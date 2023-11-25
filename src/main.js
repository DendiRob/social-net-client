import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import usePlagins from './plugins';

import './styles/style.scss';

const app = createApp(App)

app.use(createPinia())
app.use(router)

usePlagins(app)

app.mount('#app')
