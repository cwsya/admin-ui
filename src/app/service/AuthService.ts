import { Injectable } from '@angular/core';
import {RouterItemEntity} from '../entity/RouterItemEntity';
import {ApiResponseEntity} from '../entity/ApiResponseEntity';
import {NonNullableFormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ApiService} from './ApiService';
import {Router} from '@angular/router';
import {MenuEntity} from '../entity/MenuEntity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _menus:MenuEntity[]=[
    {
      level: 1,
      title: 'Mail Group',
      icon: 'mail',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: 'Group 1',
          icon: 'bars',
          open: false,
          selected: false,
          disabled: false,
          children: [
            {
              level: 3,
              title: 'Option 1',
              selected: false,
              disabled: false,
              routerLink:'/'
            },
            {
              level: 3,
              title: 'Option 2',
              selected: false,
              disabled: true,
              routerLink:'/'
            }
          ]
        },
        {
          level: 2,
          title: 'Group 2',
          icon: 'bars',
          selected: false,
          disabled: false,
          routerLink:'/admin/welcome'
        },
        {
          level: 2,
          title: 'Group 3',
          icon: 'bars',
          selected: false,
          disabled: false,
          routerLink:'/'
        }
      ]
    },
    {
      level: 1,
      title: 'Team Group',
      icon: 'team',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: 'User 1',
          icon: 'user',
          selected: false,
          disabled: false,
          routerLink:'/'
        },
        {
          level: 2,
          title: 'User 2',
          icon: 'user',
          selected: false,
          disabled: false,
          routerLink:'/'
        }
      ]
    }
  ];

  /**
   * 获取要展示的路由列表
   */
  menus(): MenuEntity[] {
    return this._menus;
  }

  /**
   * 登录方法
   * @param data
   */
  login(data:object): void {
    this.http.post<ApiResponseEntity<string>>("/auth/login",data).subscribe(res=>{

      if (res.code == 200) {
        this.setToken(res.data);
        this.message.success("登录成功");
        this.router.navigate(['/']);
      }else {
        this.message.error(res.msg);
      }
    })
  }

  /**
   * 判断是否登录
   */
  isLogin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post<ApiResponseEntity<boolean>>("/auth/isLogin", {}).subscribe(
        (res) => {
          if (res.code === 200) {
            resolve(res.data); // 请求成功时返回数据
          } else {
            this.message.error(res.msg);
            resolve(false); // 请求失败时返回 false
          }
        },
        (error) => {
          console.error('请求错误:', error);
          resolve(false); // 请求出错时返回 false
        }
      );
    });
  }


  // 获取存储的 token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 设置 token
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // 清除 token
  clearToken(): void {
    localStorage.removeItem('token');
  }


  constructor(private http: ApiService,private message: NzMessageService,private router:Router)  {}

}
