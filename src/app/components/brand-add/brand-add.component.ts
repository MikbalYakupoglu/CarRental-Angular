import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup;
  brands:Brand[] = [];
  constructor(private formBuilder:FormBuilder, private _brandService:BrandService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createBrandAddForm();
    this.getBrands();
  }

  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      brandName:["",Validators.required]
    });
  }

  getBrands(){
    this._brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    });
  }

  addBrand(){
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({},this.brandAddForm.value);
      this._brandService.addBrand(brandModel).subscribe(response=>{
        console.log(response);
        this.toastrService.success(response.message,"Başarılı",{
          progressBar:true,
          timeOut:2000
        })
        window.location.reload();
      },
      errorResponse=>{
        if(errorResponse.error.ValidationErrors){
          errorResponse.error.ValidationErrors.forEach((error:any) => {
            this.toastrService.error(error.ErrorMessage,"Hata",{
              progressBar:true,
              timeOut:3000
            })
          });
        }
        else if(errorResponse.error.message){ // from responseModel
          this.toastrService.error(errorResponse.error.message,"Hata",{
            progressBar:true,
            timeOut:3000
          })
        }
        else{ // from Exception
          this.toastrService.error(errorResponse.error.Message,"Hata",{
            progressBar:true,
            timeOut:3000
          })
        }
      })
    }

    else{
      this.toastrService.error("Form Eksik","Hata",{
        progressBar:true,
        timeOut:2000
      })
    }
  }

  deleteBrand(colorId:number){
    this._brandService.deleteBrand(colorId).subscribe((response)=>{
      this.toastrService.success(response.message,"Başarılı",{progressBar:true,timeOut:3000});
      (window.location.reload(),2000);
    },
    errorResponse => {
      console.log(errorResponse);
      if (errorResponse.error.message) {
      this.toastrService.error(errorResponse.error.message,"Başarılı",{progressBar:true,timeOut:3000});
      }
    });
  }


  

}
