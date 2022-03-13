import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem("token");

    if (token !== null) {
      this.authService.checkIfTokenExpired();
    }

    let newRequest:HttpRequest<any> = request.clone({
      headers: request.headers.set("Authorization","Bearer "+ token)
    });

    return next.handle(newRequest);
  }
}
