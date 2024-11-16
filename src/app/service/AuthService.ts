import { Injectable } from '@angular/core';
import {RouterItemEntity} from '../entity/RouterItemEntity';
import {ApiResponseEntity} from '../entity/ApiResponseEntity';
import {NonNullableFormBuilder} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ApiService} from './ApiService';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _routers:RouterItemEntity[]=[
    {
      id:"1",
      name:"welcome",
      routerLink:"/admin/welcome"
    },
    {
      id:"2",
      name:"test",
      routerLink:"/admin/test"
    },
    {
      id:"3",
      name:"login",
      routerLink:"/login"
    }
  ]

  /**
   * 获取要展示的路由列表
   */
  routers(): RouterItemEntity[] {
    return this._routers;
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
