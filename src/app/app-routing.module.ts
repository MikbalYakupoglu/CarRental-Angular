import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarComponent } from './components/car/car.component';
import { CartComponent } from './components/cart/cart.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  {path:"",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"carDetails/:carId",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/brand/:brandId/color/:colorId",component:CarComponent},
  {path:"payment",component:PaymentComponent},
  {path:"cart",component:CartComponent},
  {path:"cars/add",component:CarAddComponent},
  {path:"brands/add", component:BrandAddComponent},
  {path:"colors/add", component:ColorAddComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
