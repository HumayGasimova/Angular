import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  orders: any[];
  
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders()
      .subscribe(orders => {
        console.log("Hey")
        // debugger
        // this.orders = orders
      });
  }

}
