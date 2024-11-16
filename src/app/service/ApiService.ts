import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://127.0.0.1:8080';

  constructor(private http: HttpClient) {}

  get<T>(url:string): Observable<T> {
    return this.http.get<T>(this.apiUrl+url);
  }

  post<T>(url:string,data: any): Observable<T> {
    return this.http.post<T>(this.apiUrl + url, data);
  }
}
