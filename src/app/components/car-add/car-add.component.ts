import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup;
  cars:Car[] = [];
  brands:Brand[] = [];
  colors:Color[] = [];

  brandId:number = 0;
  colorId:number = 0;

  carImageFile:File;

  constructor(private _carService:CarService, private toastrService:ToastrService,
    private formBuilder:FormBuilder, private _brandService:BrandService, private _colorService:ColorService) { }

  ngOnInit(): void {
    this.getCars();
    this.getBrands();
    this.getColors();

    this.createCarAddForm();
  }

  getCars(){
    this._carService.getCars().subscribe(response=>{
      this.cars = response.data;
    });
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

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId:["0",Validators.required],
      colorId:["0",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
      
    });
  }
  

  addCar(){
    if (this.carAddForm.get("brandId").value !== "0" && this.carAddForm.get("colorId").value !== "0" 
    && this.carAddForm.valid){

      let carModel = Object.assign({},this.carAddForm.value);
      
      this._carService.addCar(carModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı",{
          progressBar:true, timeOut:2000
        });
     },
     errorResponse=>{

      if(errorResponse.error.ValidationErrors){ // validation rules error
        errorResponse.error.ValidationErrors.forEach((error:any) => {
          this.toastrService.error(error.ErrorMessage,"Hata",{
            progressBar:true, timeOut:3000
          });
        });
      }

      else if (errorResponse.error.message){ //business rules error
        this.toastrService.error(errorResponse.error.message,"Hata",{
          progressBar:true, timeOut:3000
        });
      }

      else{ // exception error
        this.toastrService.error(errorResponse.error.Message,"Hata",{
          progressBar:true, timeOut:3000
        });
      }
     })
     
    }
    else{
      this.toastrService.error("Form Eksik","Hata",{
        progressBar:true, timeOut:3000
      });
    }
  }


}
