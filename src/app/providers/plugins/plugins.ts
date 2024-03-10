import 'virtual:svg-icons-register';

import DefaultLayout from 'pages/layout';
import { SvgIcon } from 'shared/ui/SvgIcon';
import SidebarTitle from 'shared/ui/sidebarTitle';
import CustomLoader from 'shared/ui/customLoader';
import InputText from 'shared/ui/InputText';
import CustomBtn from 'shared/ui/customBtn';
import InputNumber from 'shared/ui/inputNumber';

import type { App } from 'app/index.types';

export default function usePlugins(app: App) {
  app.component('default-layout', DefaultLayout);
  app.component('SvgIcon', SvgIcon);
  app.component('SidebarTitle', SidebarTitle);
  app.component('CustomLoader', CustomLoader);
  app.component('InputText', InputText);
  app.component('InputNumber', InputNumber);
  app.component('CustomBtn', CustomBtn);
}
