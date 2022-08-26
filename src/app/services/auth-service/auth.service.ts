import { Injectable, ModuleWithComponentFactories } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DataService } from '../data-service';
import { ApiService } from '../api-service/api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor( private apiService: ApiService) {     

    const token = localStorage.getItem('profanis_auth');
    this._isLoggedIn$.next(!!token);
    
  }

  login(email: string, password: string) {
    return this.apiService.login(email,password).pipe(
      tap((response: any)=> {                      
        if(response && response.token) {
          // console.log("response: " + JSON.stringify(response));
          this._isLoggedIn$.next(true);
          localStorage.setItem('token', response.token);
          return true;
        }
        return false;
      })
    )
  }

  logout(){
    localStorage.removeItem('token');
  }

  isLoggedIn(){
    let token = localStorage.getItem('token');
    if(token)
    
    if(token) {return true};

    return false;
  }

  // => *** using as properties not method ...
  get CurrentUser(){
    let token = localStorage.getItem('token');
    if(!token) return null;
    
    let userRole = JSON.parse(atob(token.split('.')[1]));
    // console.log((atob(token.split('.')[1])));
    // if(!(userRole.admin === true)) return false;
    
    return userRole;
  }

  // private getExpiration() {
  //   const expiration = localStorage.getItem('token')
  // }
  
}
