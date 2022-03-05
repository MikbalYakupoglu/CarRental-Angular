import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { NaviComponent } from './components/navi/navi.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { FilterPipe } from './pipes/filter.pipe';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { PaymentComponent } from './components/payment/payment.component';
import { HourlyPricePipe } from './pipes/hourly-price.pipe';
import { CartComponent } from './components/cart/cart.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    NaviComponent,
    ColorComponent,
    CustomerComponent,
    CarComponent,
    RentalComponent,
    CartSummaryComponent,
    FilterPipe,
    CarFilterComponent,
    PaymentComponent,
    HourlyPricePipe,
    CartComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    CarUpdateComponent,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    FontAwesomeModule,
  ],

  providers: [

  ],

  bootstrap: [
    AppComponent
  ],
})
export class AppModule {  }
