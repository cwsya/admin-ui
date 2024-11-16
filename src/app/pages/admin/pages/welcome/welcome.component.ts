import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../../service/ApiService';
import {ApiResponseEntity} from '../../../../entity/ApiResponseEntity';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private apiSerVice:ApiService) { }

  ngOnInit() {
    this.apiSerVice.post<any>("/hello", {
    }).subscribe(res=>{
      console.log(res);
    });

  }

}
