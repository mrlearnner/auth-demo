import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, throwError, NotFoundError, Observable } from 'rxjs';
import { UserModel } from './auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(@Inject(String) private url: string, private http: HttpClient) { }
        
        getAll() {
          return this.http.get<any[]>(this.url).pipe(
            catchError(this.handleError)
          );
        }
      
        get(id: number) { 
          return this.http.get(this.url + '/' + id)
            .pipe(
            catchError(this.handleError)
            );    
        }
      
        create(resource: any) {
          return this.http.post(this.url, JSON.stringify(resource))
            .pipe(
            catchError(this.handleError)
            );
        }
      
        update(resource: any) {
          return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }))
            .pipe(      
            catchError(this.handleError)
            );
        }
      
        delete(id: number) {
          return this.http.delete(this.url + '/' + id)
            .pipe(            
            catchError(this.handleError)
            );
        }
              
        private handleError(error: HttpErrorResponse) {
            if (error.status === 0) {
              // A client-side or network error occurred. Handle it accordingly.      
              console.error('An error occurred:', error.error);
            } else if(error.status === 400){
              return throwError(error);
            } 
            else if (error.status === 404) {
              // The backend returned an unsuccessful response code.
              // The response body may contain clues as to what went wrong.
              console.error(`Backend returned code ${error.status}, body was: `,error.error);
              return throwError(error)
            }
            // Return an observable with a user-facing error message.
            return throwError(error);
          }
}
