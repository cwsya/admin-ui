import {ChangeDetectorRef, Component} from '@angular/core';
import {NgForOf, NgTemplateOutlet} from '@angular/common';
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent, NzSiderComponent} from 'ng-zorro-antd/layout';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from 'ng-zorro-antd/menu';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from '../../service/AuthService';
import {RouterItemEntity} from '../../entity/RouterItemEntity';
import {filter} from 'rxjs';
import {MenuEntity} from '../../entity/MenuEntity';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    NgForOf,
    NzContentComponent,
    NzHeaderComponent,
    NzIconDirective,
    NzLayoutComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzSiderComponent,
    NzSubMenuComponent,
    RouterLink,
    RouterOutlet,
    NgTemplateOutlet
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private authService: AuthService,private router: Router,private cdr: ChangeDetectorRef) {}

  //路由列表
  menus:MenuEntity[] = new Array<MenuEntity>();



  //菜单栏收缩状态
  isCollapsed = false;

  ngOnInit(){
    //路由列表
    this.menus=this.authService.menus();

    // 监听路由变化
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.updateMenuState(this.menus);
      this.cdr.detectChanges(); // 确保变更检测
    });

    // 初次加载时展开
    this.updateMenuState(this.menus);
  }

  updateMenuState(menus: MenuEntity[]): void {
    menus.forEach(menu => {
      if (menu.children) {
        menu.open = menu.children.some(child => this.isActive(child));
        this.updateMenuState(menu.children);
      }
    });
  }

  isActive(menu: MenuEntity): boolean {
    return menu.routerLink ? this.router.isActive(menu.routerLink, true) : false;
  }

  trackByFn(index: number, item: MenuEntity): string {
    return item.title;
  }





  onClickTest():void{

  }

}
