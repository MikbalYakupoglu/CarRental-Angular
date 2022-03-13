import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService,
    private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email:[,Validators.required],
      password:[,Validators.required]
    });
  }

  login(){

    let loginModel = Object.assign({},this.loginForm.value);
    
    if (this.loginForm.valid) {
      this.authService.login(loginModel).subscribe((response)=>{
          localStorage.setItem("token",response.data.token);
          localStorage.setItem("tokenExpiration",response.data.expiration);
          this.router.navigate([""]);        
      },
      (errorResponse)=>{
        this.toastrService.error("Kullanıcı Adı Veya Şifre Yanlış");
      });
    }
    else{
      this.toastrService.error("Bilgiler Boş Bırakılamaz","Hata");
    }


  }

}



