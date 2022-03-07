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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  @ViewChild('closeButton') closeButton:any;

  constructor(private _carService:CarService, private _activatedRoute:ActivatedRoute, 
    private _cartService:CartService, private _toastrService:ToastrService, private router:Router,
    private formBuilder:FormBuilder, private _brandService:BrandService, private _colorService:ColorService ) { }

  disablePastDates:boolean = true;
  cars:Car[] = [];
  carImages:CarImage[] = [];
  brands:Brand[] = [];
  colors:Color[] = [];

  brandId:number = 0;
  colorId:number = 0;

  carDetails:Car;
  currentCar:Car;
  currentCarImage:CarImage;
  dataListed = false;
  filterText = "";

  rentDate:Date;
  returnDate:Date;

  dateOfNow:Date;

  activeModal:boolean = false;
  currentImagePath:string;

  carUpdateForm:FormGroup;
  carUpdateMode:boolean = false;

  carImageForm:FormGroup;
  imageToUpload:File;

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

      this.setCurrentCar(this.carDetails);


      if (this.router.url.indexOf("update") > -1) {
        this.getCurrentCarsBrand();
        this.getCurrentCarsColor();
        this.createCarUpdateForm(); 
        this.carUpdateMode = true;
        this.createCarImageForm();


      } else {
        this.carUpdateMode = false;
      }

    });
  }

  setCurrentCarById(carId:number){
    this.cars.forEach((car:Car) => {
      if (car.carId === carId) {
        this.currentCar = car;
      }
    });    
  }

  setCurrentCar(car:Car){
    this.currentCar = car;
  }

  getCurrentCar():Car{
    return this.currentCar;
  }

  getCarImages(carId:number){
    this._carService.getImagesByCar(carId).subscribe(response=>{
      this.carImages = response.data;
    });
  }
  
  setCurrentCarImage(carImage:CarImage){
    this.currentCarImage = carImage;
  }

  getCurrentCarImage():CarImage{
    return this.currentCarImage;
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

  getBrands(){
    this._brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
      
    });
  }

  setBrandId(_brandId:string){
    let currentBrandId = parseInt(_brandId);
    this.brandId = currentBrandId;
  }
  
  getColors(){
    this._colorService.getColors().subscribe(response=>{
      this.colors = response.data;

    });
  }

  setColorId(_colorId:string){
    let currentColorId = parseInt(_colorId);
    this.colorId = currentColorId;
  }
  
  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      carId:[this.currentCar.carId],
      brandId:[this.brandId,Validators.required],
      colorId:[this.colorId,Validators.required],
      modelYear:[this.currentCar.modelYear,Validators.required], 
      dailyPrice:[this.currentCar.dailyPrice,Validators.required],
      description:[this.currentCar.description,Validators.required]
    });
  }

  updateMode(){
    if (this.carUpdateMode === true) {
      // this.carUpdateMode = false;
      this.router.navigate(["carDetails/"+this.currentCar.carId]);
    } else {
      // this.getCurrentCarsBrand();
      // this.getCurrentCarsColor();
      // this.createCarUpdateForm();
      // this.carUpdateMode = true;
      this.router.navigate(["carDetails/update/"+this.currentCar.carId]);
    }
  }

   isContainedIn(subset:any, cluster:any) {
    if (typeof subset != typeof cluster)
        return false;
    if (Array.isArray(subset) && Array.isArray(cluster)) {
        // assuming same order at least
        for (var i=0, j=0, la=subset.length, lb=cluster.length; i<la && j<lb;j++)
            if (this.isContainedIn(subset[i], cluster[j]))
                i++;
        return i==la;
    } else if (Object(subset) === subset) {
        for (var p in subset)
            if (!(p in cluster && this.isContainedIn(subset[p], cluster[p])))
                return false;
        return true;
    } else
        return subset === cluster;
}

  // null check eklenecek (null ise aynı değer atanacak)
  updateChanges(){
    

    let carModelToUpdate = Object.assign({},this.carUpdateForm.value);


    if(!this.carUpdateForm.valid){
        this._toastrService.error("Form Eksik","Hata",{progressBar:true, timeOut:3000});
    }

    else if (this.isContainedIn(carModelToUpdate,this.currentCar)) {
      this._toastrService.error("Girilen Bilgiler Aynı Olamaz.","Güncelleme Başarısız",{progressBar:true,timeOut:3000})
    }    

    else {

      this._carService.updateCar(carModelToUpdate).subscribe((response) =>{    
    
          this._toastrService.success("Ürün Güncellendi","Başarılı",{timeOut:3000,progressBar:true});
          this.router.navigate(['cars']);
        },
        (errorResponse) => {
          if(errorResponse.error.ValidationErrors){ //Validation Error
            errorResponse.error.ValidationErrors.forEach((error:any) => {
            this._toastrService.error(error.ErrorMessage,"Hata",{progressBar:true,timeOut:4000});          
            });
          }
          else if (errorResponse.error.message) { //Business Error
            this._toastrService.error(errorResponse.error.message,"Hata",{progressBar:true,timeOut:3000});            
          }
          else if (errorResponse.error.Message) { //Exception Error
            this._toastrService.error(errorResponse.error.Message,"Hata",{progressBar:true,timeOut:3000});
          }
    
          
        })
    }

   
    
  }

  getCurrentCarsBrand(){

    for (let i = 0; i < this.brands.length; i++) {
        if (this.brands[i].brandName === this.currentCar.brandName) {
          this.brandId = this.brands[i].brandId;
        }
      
    }
  }

  getCurrentCarsColor(){

    for (let i = 0; i < this.colors.length; i++) {
      if (this.colors[i].colorName === this.currentCar.colorName) {
        this.colorId = this.colors[i].colorId;
      }      
   }
  }


  createCarImageForm(){
    this.carImageForm = this.formBuilder.group({
      carId:[this.currentCar.carId],
      carImageId:[],
      imagePath:[],
      date:[]
    })
  }

  carImageToUpload(files:FileList){    
    this.imageToUpload = files.item(0);

  } 

  // file okuyor ama carimagei object olarak alıyor(içeriğini almıyor)
  addImage(file:File){

    let carImageToUploadFormData:FormData = new FormData();
    let carImageModelFormData:FormData = new FormData();

    let carImageModel = Object.assign({}, this.carImageForm.value);

    carImageToUploadFormData.append("file",this.imageToUpload);
    carImageModelFormData.append("carImage",JSON.stringify(this.carImageForm.value));


    this._carService.addCarImage(carImageToUploadFormData,carImageModelFormData).subscribe(response=>{
      console.log(response);
      console.log("response");

      this._toastrService.success(response.message,"Başarılı",{progressBar:true,timeOut:3000})

    },
    errorResponse=>{
      console.log("errorResponse");
      console.log(errorResponse);

      if (file === undefined) {
        this._toastrService.error("Resim Boş Bırakılamaz","Hata",{progressBar:true,timeOut:3000})
      }
    });
  }


  ngOnInit(): void {
    this.dateOfNow = new Date();

    this.getBrands();
    this.getColors();


    this._activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.showCarDetails(params["carId"]);
        this.getCarImages(params["carId"]);
        

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
