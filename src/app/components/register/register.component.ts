import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    
    ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName:[,Validators.required],
      lastName:[,Validators.required],
      email:[,Validators.required],
      password:[,Validators.required],
    });
  }

  // register eklenecek
  register(){

    let registerModel = Object.assign({},this.registerForm.value);

    if (!this.registerForm.valid) {
      this.toastrService.error("Bilgiler Boş Bırakılamaz")
    }
  }

}
