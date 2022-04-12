import { Title } from '@angular/platform-browser';
import { Order } from './../../../../shared/models/order';
import { OrderService } from './../../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: [
    './../../../../../assets/client/assets/css/uikit.css',
    './../../../../../assets/client/assets/css/style.css',
    './../../../../../assets/client/assets/css/tailwind.css',
    './list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {
  orders: any = [Order]
  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  constructor(
    private orderService: OrderService,
    private titleService: Title) {
      this.titleService.setTitle("Đơn hàng của bạn - Course Plus");
   }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getAll()
    .subscribe((data: any) => {
      this.orders = data;

      console.log(this.orders);
    });
  }

}
