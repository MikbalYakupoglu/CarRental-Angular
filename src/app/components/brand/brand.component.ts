import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  constructor(private _brandService:BrandService, private _formBuilder:FormBuilder,
    ) { }

  brands:Brand[] = [];
  currentBrand:Brand = {brandId:0,brandName:""};
  dataLoaded:boolean = false;
  contactForm:FormGroup;

  showBrands(){
    this._brandService.getBrands().subscribe((response) =>{
        this.brands = response.data;
        this.dataLoaded = true;
    });
  }

  //current brand almıyor
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

  filter():number{
    console.log(this.currentBrand.brandId);
    return this.currentBrand.brandId;
  }

  setFilterDefault(){
    this.contactForm = this._formBuilder.group({
      brandFilter:[null]
    })
  }
  
  ngOnInit(): void {
    this.setFilterDefault();
    this.showBrands();
  }

}
