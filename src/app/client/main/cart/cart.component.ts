import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CartService } from 'src/app/shared/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: [
    './../../../../assets/client/assets/css/uikit.css',
    './../../../../assets/client/assets/css/style.css',
    './../../../../assets/client/assets/css/tailwind.css',
    './cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: any;

  private apiURL = environment.apiUrl;
  baseUrl: string = this.apiURL;

  constructor(
    public cartService: CartService,
    private titleService: Title
    ) {
      this.titleService.setTitle("Giỏ hàng của bạn - Course Plus");
     }

  ngOnInit(): void {
    this.getCarts();
  }

  getCarts() {
    this.cartService
      .getAll()
      .subscribe((data: any) => {
        console.log(data);
        this.cart = data;
      });
  }

  removeItemFromCart(id: string) {
    this.cartService
      .deleteItemFromCart(id)
      .subscribe((data: any) => {
        console.log("Remove ok");
        this.getCarts();
      });
  }

}
