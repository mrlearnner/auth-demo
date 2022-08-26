import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { OrderModel, UserModel } from '../auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post('login', {email, password});
  }

  getUsers(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>('users', {
      headers: {},
    })
  }

  // getOrders(): Observable<OrderModel[]>{
  //   return this.http.get<OrderModel[]>('/api/orders', {
  //     headers: {},
  //   })
  // }
  getOrders(): Observable<OrderModel[]>{
    const headers = new HttpHeaders();
    
    let token = localStorage.getItem('token');
    const head = headers.append('Authorization', 'Bearer '+token );
    // console.log(headers.get('Authorization'));

    // let options = new RequestOptions({ headers: headers});

    return this.http.get<OrderModel[]>('/api/orders', {
      headers: head
      //  OR  
      // headers: headers.append('Authorization', 'Bearer '+token)
    })
  }
}
