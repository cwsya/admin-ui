export interface RouterItemEntity {
  id: string;
  name: string;
  routerLink: string;
  children?: RouterItemEntity[];
}
