export interface MenuEntity {
  level: number;
  title: string;
  icon?: string;
  open?: boolean;
  selected: boolean;
  disabled: boolean;
  routerLink?: string;
  children?: MenuEntity[];

}
