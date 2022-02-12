import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  constructor(private _brandService:BrandService,    private router:Router,
   ) { }

  brands:Brand[] = [];
  currentBrand:Brand = {brandId:0,brandName:""};
  dataLoaded:boolean = false;
  contactForm:FormGroup;
  colorSelected:boolean = false;

  showBrands(){
    this._brandService.getBrands().subscribe((response) =>{
        this.brands = response.data;
        this.dataLoaded = true;
    });
  }

  getCurrentBrand(brand:Brand){
    this.currentBrand = brand;
  }

  setCurrentBrandClass(brand:Brand){
    if (brand != this.currentBrand) {
      return "list-group-item";
    }
    else{
      return "list-group-item active";
    }
  } 

  routeTo(routerLink: string) {
    if (routerLink != null) {
      this.router.navigate([routerLink])
    }
  }
  
  ngOnInit(): void {
    this.showBrands();
  }

}
