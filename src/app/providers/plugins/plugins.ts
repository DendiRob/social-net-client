import 'virtual:svg-icons-register';

import DefaultLayout from 'pages/layout';

import type { App } from 'app/index.types';
import { SvgIcon } from 'shared/ui/SvgIcon';

export default function usePlugins(app: App) {
  app.component('default-layout', DefaultLayout);
  app.component('SvgIcon', SvgIcon);
}