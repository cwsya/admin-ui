import { Component } from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {AuthService} from '../../../service/AuthService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NzButtonModule, NzCheckboxModule, NzFormModule, NzInputModule, NzFlexDirective],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  validateForm:FormGroup = new FormGroup({})
  str:string = "123"

  submitForm(): void {
    if (this.validateForm.valid) {
      // 登录成功后跳转到后台管理页面
      this.authService.login(this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    });

    // 如果token存在且已经登录，则跳转到后台管理页面
    if (this.authService.getToken() != null) {
      this.authService.isLogin().then(isLoginType=>{
        if (isLoginType){
          this.router.navigate(['/admin'])
        }
      })

    }

  }


  constructor(private fb: NonNullableFormBuilder,private authService: AuthService,private router:Router)  {}
}
