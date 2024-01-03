import 'virtual:svg-icons-register';
import type { App } from '@/index.types';

import DefaultLayout from '../layouts/DefaultLayout.vue';

export default function (app: App) {
  app.component('default-layout', DefaultLayout);
}
