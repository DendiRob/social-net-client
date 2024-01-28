interface IMenuItem {
  icon: string;
  label: string;
  routeName: string;
}

export interface IMenuItems {
  [key: string]: IMenuItem;
}
