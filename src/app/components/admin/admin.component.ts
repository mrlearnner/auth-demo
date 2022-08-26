import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/services/auth.interceptor';
import { tap } from 'rxjs';

import { OrderService } from 'src/app/services/order-service/order.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  orders: OrderModel[] = [];
  displayedColums: string[] = ['id', 'name'];

  constructor(private orderService: OrderService ) { }

  ngOnInit(): void {
    this.orderService.getOrders().pipe(tap((it) => this.orders = it)).subscribe();
    // this.orderService.getOrders().pipe(tap((it) => console.log(it))).subscribe( res => console.log("admin : " + res ));
    // this.orders.forEach(element => {
    //   console.log(element);    
  }

}
