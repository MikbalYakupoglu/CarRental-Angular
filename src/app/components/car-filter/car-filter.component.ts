import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {

  constructor(private _brandService:BrandService, private _colorService:ColorService,
    private router:Router, private _toastrService:ToastrService, ) { }

  brands:Brand[];
  colors:Color[];
  cars:Car[];

  showFilterSelectors:boolean = true;
  brandId:number = 0;
  colorId:number = 0;

  currentFilter = window.sessionStorage;

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
    this.setBrandIdOfSession(parseInt(_brandId));
  }

  setColorId(_colorId:string){
    this.colorId = parseInt(_colorId);
    this.setColorIdOfSession(parseInt(_colorId));
  }

  filterSuccessToastr(){
    this._toastrService.success("Filtreleme Başarılı.","",{
      timeOut:2000,
      progressBar:true      
    });
  }

  filterEmptyToastr(){
    this._toastrService.info("Filtre Seçilmedi.","",{
      timeOut:2000,
      progressBar:true
    })
  }

  filterSuccessRemovedToastr(){
      this._toastrService.success("Filtreleme Başarıyla Temizlendi.","",{
        timeOut:2000,
        progressBar:true  
    })
  }

  showCarsByFilter(){ 

      if (this.colorId > 0 && this.brandId > 0) {
        this.router.navigate(['cars/brand/' + this.brandId + '/color/' + this.colorId]);    
        this.filterSuccessToastr();
      } 
      else if (this.brandId > 0) {
        this.router.navigate(['cars/brand/' + this.brandId]);    
        this.filterSuccessToastr();
      }
      else if (this.colorId > 0){
        this.router.navigate(['cars/color/' + this.colorId]);   
        this.filterSuccessToastr();
      }
      else{
        this.router.navigate([""]);
        this.filterEmptyToastr();
      }    
  }

  resetId(){
    this.brandId = 0;
    this.colorId = 0;
    this.currentFilter.clear();
  }

  setFilterButtonClass():string{
    if (this.colorId > 0 || this.brandId > 0) {
      return "btn btn-success";
    }
    else{
      return "btn btn-success disabled";
    }
  }

  getBrandIdOfSession(){
    return parseInt(this.currentFilter.getItem("brandId"));
  }

  getColorIdOfSession(){
    return parseInt(this.currentFilter.getItem("colorId"));
  }

  setBrandIdOfSession(brandId:number){
    this.currentFilter.setItem("brandId",brandId.toString());
  }

  setColorIdOfSession(colorId:number){
    this.currentFilter.setItem("colorId",colorId.toString());
  }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();



    if(isNaN(this.getBrandIdOfSession())){
      this.setBrandIdOfSession(0);
    }

    if(isNaN(this.getColorIdOfSession())){
      this.setColorIdOfSession(0);
    }

    this.brandId = this.getBrandIdOfSession();
    this.colorId = this.getColorIdOfSession();
    
    
    if(this.router.url.includes("carDetails")){
      this.showFilterSelectors = false;
    }
    else{
      this.showFilterSelectors = true;
    }
  }

  

}
