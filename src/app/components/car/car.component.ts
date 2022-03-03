import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarFilter } from 'src/app/models/carFilter';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CartService } from 'src/app/services/cart.service';
import { DateButton } from 'angular-bootstrap-datetimepicker';
import { unitOfTime } from 'moment';
import * as moment from 'moment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  @ViewChild('closeButton') closeButton:any;

  constructor(private _carService:CarService, private _activatedRoute:ActivatedRoute, 
    private _cartService:CartService, private _toastrService:ToastrService, private router:Router,
    private formBuilder:FormBuilder ) { }

  disablePastDates:boolean = true;
  cars:Car[] = [];
  carImages:CarImage[] = [];
  carDetails:Car;
  currentCar:Car;
  dataListed = false;
  filterText = "";

  rentDate:Date;
  returnDate:Date;

  dateOfNow:Date;

  activeModal:boolean = false;
  currentImagePath:string;

  carUpdateForm:FormGroup = new FormGroup({
    brandName: new FormControl(),
    colorName: new FormControl(),
    modelYear: new FormControl(),
    dailyPrice: new FormControl(),
    description: new FormControl(),
  });
  carUpdateMode:boolean = false;

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
      this.carDetails = response.data;
      this.dataListed = true;

    });
  }

  setCurrentCar(car:Car){
    this.currentCar = car;
  }

  getCurrentCar():Car{
    return this.currentCar;
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
    this._cartService.ValidItemForAddCart(car,this.rentDate,this.returnDate,this.calculateRentCost(), this.closeButton);
  }

  getHourlyPriceOfCar(dailyPrice:number):number{
    return dailyPrice /24;
  }

  getRentDaYOfYear():number{
    let now:any = this.rentDate;
    let start:any = new Date(now.getFullYear(), 0, 0);
    let diff = now - start;
    let oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);

    return day;
  }

  getReturnDaYOfYear():number{
    let now:any = this.returnDate;
    let start:any = new Date(now.getFullYear(), 0, 0);
    let diff = now - start;
    let oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);

    return day;
  }

  calculateRentCost():number{
    let returnHour:number = this.returnDate.getHours();    
    let rentHour:number = this.rentDate.getHours();    
    let totalRentDay = this.getReturnDaYOfYear() - this.getRentDaYOfYear();

    return this.getHourlyPriceOfCar(this.currentCar.dailyPrice) * ((totalRentDay*24) + (returnHour - rentHour));
  }

  startDatePickerFilter = (dateButton: DateButton, viewName: string) => {
    return this.disablePastDates
      ? dateButton.value >= moment().startOf(viewName as unitOfTime.StartOf).valueOf()
      : true;
  }


  totalRentDate():string{
    return this.rentDate.toString() + " - " + this.returnDate.toString();
  }

  checkIfRentDateValid(car:Car){
    if(this.rentDate == undefined || this.returnDate == undefined){
      this._toastrService.error("Tarih Boş Bırakılamaz.","Hata",{
        timeOut:2000,
        progressBar:true
    })}
    else if (this.returnDate <= this.rentDate) {
      this._toastrService.error("Dönüş Tarihi Kiralama Tarihinden Erken Olamaz.","Hata",{
        timeOut:2000,
        progressBar:true
      })}
    else if (this.rentDate < this.dateOfNow){
      this._toastrService.error("Geçmiş Tarih Seçilemez.","Hata",{
        timeOut:2000,
        progressBar:true  
    })}
    else{        
        this.addToCart(car);
    }
  }

  updateMode(){
    if (this.carUpdateMode === true) {
      this.carUpdateMode = false;
    } else {
      this.carUpdateMode = true;
    }
  }

  loadCarInfo(){
    this.carUpdateForm = this.formBuilder.group({
      brandName:[""],
      colorName:[""],
      modelYear:[""],
      dailyPrice:[""],
      description:[""]
    });
  }

  updateChanges(){

  }

  ngOnInit(): void {
    this.dateOfNow = new Date();


    this._activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.showCarDetails(params["carId"]);
        this.getCarImages(params["carId"]);
        this.loadCarInfo();

      }
      else if (params["brandId"] && params["colorId"]){
        this.showCarsByFilter(params["brandId"],params["colorId"]);
        this.getCarImageForExhibit();
      }      
      else if (params["brandId"]) {
        this.showCarsByBrand(params["brandId"])
        this.getCarImageForExhibit();
      }
      else if(params["colorId"]){
        this.showCarsByColor(params["colorId"]);
        this.getCarImageForExhibit();
      }
      else{
        this.showCars();
        this.getCarImageForExhibit();
      }
    });



  }

}
