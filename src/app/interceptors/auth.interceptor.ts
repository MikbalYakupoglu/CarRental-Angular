import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as moment from 'moment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem("token");

    this.authService.checkIfTokenExpired();
    let tokenExpiration = localStorage.getItem("tokenExpiration");

    if (tokenExpiration !== null) {   
      let newExpirationTime = new Date(tokenExpiration); 
      localStorage.setItem("tokenExpiration",(moment(newExpirationTime).add(5, 's').toDate().toString()));
    }

    let newRequest:HttpRequest<any> = request.clone({
      headers: request.headers.set("Authorization","Bearer "+ token)
    });

    return next.handle(newRequest);
  }
}
