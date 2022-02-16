import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarFilter } from 'src/app/models/carFilter';
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
    private _cartService:CartService, private _toastrService:ToastrService, private router:Router
    ) { }

  cars:Car[] = [];
  carImages:CarImage[] = [];
  carDetails:Car;
  currentCar:Car;
  dataListed = false;
  filterText = "";

  currentImagePath:string;
  thumbnail:any;

   sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

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

  showCarsByFilter(_brandId:number,_colorId:number){
    let carFilter:CarFilter = {brandId:_brandId, colorId:_colorId};
    this._carService.getCarsByFilter(_brandId,_colorId).subscribe(response=>{
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

  getCarImages(carId:number){
    this._carService.getCarImages(carId).subscribe(response=>{
      this.carImages = response.data;
    });
  }

  getCarImageForExhibit(){
    this._carService.getCarImageForExhibit().subscribe(response=>{
      this.carImages = response.data;
    })   
  }

  getCarIdForExhibitImage(carId:number){

    if (this.carImages.length !== null) {
      for (let i = 0; i < this.carImages.length; i++) {
        if (this.carImages[i].carId === carId ) {
          return this.getImageSource(this.carImages[i]);
        }      
      }
    }
    return null;
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
        this.getCarImages(params["carId"]);
      }
      else if (params["brandId"] && params["colorId"]){
        this.showCarsByFilter(params["brandId"],params["colorId"]);
      }      
      else if (params["brandId"]) {
        this.showCarsByBrand(params["brandId"])
      }
      else if(params["colorId"]){
        this.showCarsByColor(params["colorId"]);
      }
      else{
        this.showCars();
        this.getCarImageForExhibit();
      }
    });
  }

}
