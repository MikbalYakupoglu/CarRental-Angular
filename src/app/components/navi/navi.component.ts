import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(
    private toastrService:ToastrService,
    private router:Router
    ) { }

  
  isLogined:boolean = false;

  ngOnInit(): void {

    if (localStorage.getItem("token")) {
      this.isLogined = true;
    }
    else{
      this.isLogined = false;
    }
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    this.isLogined = false;

    this.router.navigate([""]);
    this.toastrService.info("Çıkış Başarılı");
  }

}
