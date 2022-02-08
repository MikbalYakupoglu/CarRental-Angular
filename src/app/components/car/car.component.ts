import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  constructor(private _carService:CarService, private _activatedRoute:ActivatedRoute, 
    private _cartService:CartService, private _toastrService:ToastrService) { }

  cars:Car[] = [];
  carImages:CarImage[];
  carDetails:Car;
  currentCar:Car;
  dataListed = false;
  filterText = "";
  
  currentImagePath:string;
  thumbnail:any;

  showCars(){
    this._carService.getCars().subscribe(response => {
      this.cars = response.data;
      this.dataListed = true;
    });
  }

  showCarsByBrand(brandId:number){
    this._carService.getCarsByBrand(brandId).subscribe(response =>{
      this.cars = response.data;
      this.dataListed = true;
    });
  }

  showCarsByColor(colorId:number){
    this._carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars = response.data;
      this.dataListed = true;
      });
  }

  showCarDetails(carId:number){
    this._carService.getCarById(carId).subscribe(response=>{
      this.carDetails=response.data;
      this.dataListed = true;
    });
  }

  getCurrentCar(car:Car){
    this.currentCar = car;
  }

  getCarImage(carId:number){
    this._carService.getCarImage(carId).subscribe(response=>{
      this.carImages = response.data;
    });
  }

  getImageSource(carImage:CarImage):string{ 
    let url:string= "https://localhost:44309/" + carImage.imagePath;
    return url;
  }

  addToCart(car:Car){
    this._toastrService.clear();
    this._cartService.addToCart(car);
    this._toastrService.success("Sepete Eklendi", car.description);
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.showCarDetails(params["carId"]);
        this.getCarImage(params["carId"]);
        this.getImageSource;
      }
      else if (params["brandId"]) {
        this.showCarsByBrand(params["brandId"])
      }
      else if(params["colorId"]){
        this.showCarsByColor(params["colorId"]);
      }
      else{
        this.showCars();
      }
    });
  }

}
