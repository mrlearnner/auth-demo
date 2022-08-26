import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { ApiService } from '../api-service/api.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  

  constructor(private apiServ: ApiService) { }

  getOrders() {
    // return this.apiServ.getOrders().pipe(tap((res)=> console.log("order service: " + res) ));
    return this.apiServ.getOrders();
  }

}
