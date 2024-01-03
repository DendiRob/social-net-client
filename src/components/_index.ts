import SvgIcon from './SvgIcon.vue';
import type { App } from '@/index.types';

export default function (app: App) {
  app.component('SvgIcon', SvgIcon);
}
