import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }

  apiUrl:string = "https://localhost:44309/api/auth/";


  login(loginModel:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath:string = this.apiUrl+"login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,loginModel);
  }

  isAuthenticated(){
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }

  checkIfTokenExpired(){
    
  }


}
