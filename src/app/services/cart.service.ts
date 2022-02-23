import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Car } from '../models/car';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _toastrService:ToastrService) { }


  addToCart(car:Car, rentDate:Date, returnDate:Date, totalCost:number, closeButton:any){
    let cartItem = new CartItem();
    cartItem.car = car;
    cartItem.rentDate = rentDate;
    cartItem.returnDate = returnDate;
    cartItem.totalCost = totalCost;

    CartItems.push(cartItem);

    closeButton.nativeElement.click();

    this._toastrService.success("Sepete Eklendi","",{
      progressBar:true,
      timeOut:2000
    })
  }

  ValidItemForAddCart(car:Car, rentDate:Date, returnDate:Date, totalCost:number, closeButton:any){
    let item = CartItems.find(c=> c.car.carId == car.carId);

   if(item){

      if (rentDate.getTime() >= item.rentDate.getTime() && rentDate.getTime() <= item.returnDate.getTime()
      || returnDate.getTime()  >= item.rentDate.getTime() && returnDate.getTime() <= item.returnDate.getTime()) {

     this._toastrService.error("Aynı Araç Aynı Tarih Aralığında Kiralanamaz.","Hata",{
       progressBar:true,
       timeOut:2000
       })
      }
      else{
        this.addToCart(car,rentDate,returnDate,totalCost,closeButton);
      }
   } 
   
    else {
        this.addToCart(car,rentDate,returnDate,totalCost,closeButton);
   }
  }

  list():CartItem[]{
    return CartItems;
  }

  removeFromCart(car:Car){
    let item:CartItem = CartItems.find(c=> c.car.carId == car.carId);
    CartItems.splice(CartItems.indexOf(item,1));
  }

}
