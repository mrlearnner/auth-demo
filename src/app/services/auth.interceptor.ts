import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';



// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   constructor(private authService: AuthService) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

//     const token = this.authService.gettoken();
//     if(token){
//       const requestWithToken = request.clone({
//         headers: new HttpHeaders({
//           Authorization: token,
//           email: 'mosh@domain.com',
//           password: '1234',
//           'Content-Type': 'application/json'
//         })
//       });
//       return next.handle(requestWithToken);
//     }

//     return next.handle(request);
//   }
// }


export const notAdmin =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOmZhbHNlfQ.qWKELmsR8hLrEZE8I8-SYzrajQO82ZSliS-7d1xyNfk'

const FAKE_JWT_TOKEN = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.dyt0CoTl4WoVjAHI9Q_CwSKhl6d_9rhM3NrXuJttkao';
const token = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.dyt0CoTl4WoVjAHI9Q_CwSKhl6d_9rhM3NrXuJttkao';
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() {}
  
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers } = request;
    const body =  request.body;
    // let r = body.email;
    //      console.log("body is " + r);
    if (url.endsWith('login') && method === 'POST') {      
      if(body.email === "auth@auth.com" && body.password === "1234"){       
         
        return handleLogin();
       }
      //  console.log('bad');
    }
    if (url.endsWith('users') && method === 'GET') {
      return handleProducts();
    }
    if(url.endsWith('/api/orders') && method === 'GET') {
      return handleOrders();
    }
    return of(
      new HttpResponse({
        status: 200,
        body: null
      })
    );

    function isLoggedIn() {      
      return headers.get('Authorization') ===  'Bearer '+token;
      // return headers.get('authorization') ===  "Bearer" + FAKE_JWT_TOKEN;
    }

    function handleLogin(): Observable<HttpEvent<any>> {
      return of(
        new HttpResponse({
          status: 200,
          body: {
            eamil: 'auth@auth.com',
            password: '1234',
            token: FAKE_JWT_TOKEN,            
            expiresIn: (new Date().getHours() )            
          },          
        })
      );
    }

    function handleProducts(): Observable<HttpEvent<any>> {
      if (!isLoggedIn()) {
        return throwError({ status: 401, error: { message: 'Unauthorized' } });
      }

      const users: UserModel[] = [...new Array(20).keys()].map(
        (item) => ({
          email: item,
          password: `User ${item}`,
        })
      );

      return of(
        new HttpResponse({
          status: 200,
          body: users,
        })
      );
    }

    function handleOrders(): Observable<HttpEvent<any>> {
      if (!isLoggedIn()) {
        return throwError({ status: 401, error: { message: 'Unauthorized' } });
      }

      const orders: OrderModel[] = [...new Array(20).keys()].map(
        (item) => ({
          id: 1,
          name: 'Wires',
        })
      );
      const orders1: OrderModel[] = [];

      return of(
        new HttpResponse({
          status: 200,
          body: [1,3,4,5],
        })
      );
    }
  }
}

export const FakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};

export interface UserModel {
  email: number;
  password: string;
}

export interface OrderModel {
  id: number;
  name: string;
}
