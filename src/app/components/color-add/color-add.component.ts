import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm:FormGroup;
  colors:Color[] = [];
  constructor(private formBuilder:FormBuilder, private _colorService:ColorService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createColorAddForm();
    this.getBrands();
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName:["",Validators.required]
    });
  }

  getBrands(){
    this._colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    });
  }

  addColor(){
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({},this.colorAddForm.value);
      this._colorService.addColor(colorModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        setTimeout(() => {
          window.location.reload();        
        }, 1000);
      },
      errorResponse=>{
        if(errorResponse.error.ValidationErrors){
          errorResponse.error.ValidationErrors.forEach((error:any) => {
            this.toastrService.error(error.ErrorMessage,"Hata");
          })
        }
        else if(errorResponse.error.message){ // from responseModel
          this.toastrService.error(errorResponse.error.message,"Hata");
        }
        else{ // from Exception
          this.toastrService.error(errorResponse.error.Message,"Hata");
        }
      })
    }

    else{
      this.toastrService.error("Form Eksik","Hata");
    }
  }

  deleteColor(colorId:number){
    this._colorService.deleteColor(colorId).subscribe((response)=>{
      this.toastrService.success(response.message,"Başarılı");
      setTimeout(() => {
        window.location.reload();        
      }, 1000);
    },
    errorResponse => {
      if (errorResponse.error.message) {
      this.toastrService.error(errorResponse.error.message);
      }
      else if (errorResponse.error.Message) {
        this.toastrService.error(errorResponse.error.Message);
        }
    });

  }


}
