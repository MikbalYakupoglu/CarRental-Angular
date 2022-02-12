import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {

  constructor(private _brandService:BrandService, private _colorService:ColorService,
    private _carService:CarService, private router:Router, private _activatedRoute:ActivatedRoute) { }

  brands:Brand[];
  colors:Color[];
  cars:Car[];

  brandId:number = 0;
  colorId:number = 0;

  getBrands(){
    this._brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }

  getColors(){
    this._colorService.getColors().subscribe(response => {
      this.colors = response.data;
    })
  }

  setBrandId(_brandId:string){
    this.brandId = parseInt(_brandId);
  }

  setColorId(_colorId:string){
    this.colorId = parseInt(_colorId);
  }

 
  showCarsByFilter(){    
    this._carService.getCarsByFilter(this.brandId,this.colorId).subscribe(response=>{
      this.cars = response.data;
    })

      if (this.colorId > 0 && this.brandId > 0) {
        this.router.navigate(['cars/brand/' + this.brandId + '/color/' + this.colorId]);           
      } 
      else if (this.brandId > 0) {
        this.router.navigate(['cars/brand/' + this.brandId]);    
      }
      else if (this.colorId > 0){
        this.router.navigate(['cars/color/' + this.colorId]);   
      }
      else{
        this.router.navigate([""]);
      }
    
  }

  resetId(){
    this.brandId = 0;
    this.colorId = 0;
  }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

}
