import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarComponent } from './components/car/car.component';
import { CartComponent } from './components/cart/cart.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { LoginComponent } from './components/login/login.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { AlreadyLoginedGuard } from './guards/already-logined.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"carDetails/:carId",component:CarComponent},
  {path:"carDetails/update/:carId",component:CarComponent, canActivate:[LoginGuard]},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/brand/:brandId/color/:colorId",component:CarComponent},
  {path:"payment",component:PaymentComponent},
  {path:"cart",component:CartComponent},
  {path:"cars/add",component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"brands", component:BrandAddComponent, canActivate:[LoginGuard]},
  {path:"colors", component:ColorAddComponent, canActivate:[LoginGuard]},
  {path:"login", component:LoginComponent, canActivate:[AlreadyLoginedGuard]},
  {path:"register", component:RegisterComponent, canActivate:[AlreadyLoginedGuard]},

  



  {path:"**", component:PagenotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
