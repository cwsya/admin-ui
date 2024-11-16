import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {NzContentComponent, NzHeaderComponent, NzLayoutComponent, NzSiderComponent} from 'ng-zorro-antd/layout';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {NzMenuDirective, NzMenuItemComponent, NzSubMenuComponent} from 'ng-zorro-antd/menu';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from '../../service/AuthService';
import {RouterItemEntity} from '../../entity/RouterItemEntity';

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
    RouterOutlet
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private authService: AuthService) {}
  ngOnInit(){
    this.routers=this.authService.routers();
  }

  //菜单栏收缩状态
  isCollapsed = true;
  //路由列表
  routers: RouterItemEntity[] = new Array<RouterItemEntity>();

  onClickTest():void{
    console.log(this.authService.routers);
  }

}
