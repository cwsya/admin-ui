import {HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {ApiResponseEntity} from '../entity/ApiResponseEntity';
import {inject} from '@angular/core';
import {Router} from '@angular/router';

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const router = inject(Router);


  // 获取存储的 token（例如从 localStorage）
  const token = localStorage.getItem('token');

  // 如果 token 存在，添加到请求头中
  if (token) {
    // 克隆请求并添加 Authorization 头部
    req = req.clone({
      setHeaders: {
        'token': token
      }
    });
  }
  return next(req).pipe(tap(event => {
    if (event.type === HttpEventType.Response && event.status===200) {
      let body:ApiResponseEntity<any> = event.body as ApiResponseEntity<any>;
      if (body.code === 511) {
        router.navigate(['/login']);
      }
    }
  }));
}
