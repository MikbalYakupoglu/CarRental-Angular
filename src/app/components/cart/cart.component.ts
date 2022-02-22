import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private _cartService:CartService) { }

  cartItems:CartItem[] = [];

  getCart(){
    this.cartItems = this._cartService.list();
  }

  ngOnInit(): void {
    console.log(this.cartItems);
  }

}
