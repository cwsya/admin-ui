import { Component } from '@angular/core';
import {FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import {NzFlexDirective, NzFlexModule} from 'ng-zorro-antd/flex';
import {HttpClient} from '@angular/common/http';
import {ApiResponseEntity} from '../../../entity/ApiResponseEntity';
import {NzMessageService} from 'ng-zorro-antd/message';
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
