import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private _cartService:CartService) { }

  cartItems:CartItem[] = [];

  getCart(){
    this.cartItems = this._cartService.list(); 
  }

  getTotalCost():number{
    let totalCartCost:number = 0;

    this.cartItems.forEach(cartItem => {
      totalCartCost += cartItem.totalCost;
    });
    
    return totalCartCost;
  }

  ngOnInit(): void {
    this.getCart();
  }

}
