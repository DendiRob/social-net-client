interface IMenuItem {
  icon: string;
  label: string;
  url: string;
}

export interface IMenuItems {
  [key: string]: IMenuItem;
}
