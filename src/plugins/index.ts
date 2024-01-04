import 'virtual:svg-icons-register';

import DefaultLayout from '../layouts/DefaultLayout.vue';

import type { App } from 'index.types';

export default function (app: App) {
  app.component('default-layout', DefaultLayout);
}
