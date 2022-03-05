import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _httpClient:HttpClient) { }

  apiUrl = "https://localhost:44309/api/";

  getCustomers():Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl+"customers/getcustomerdetails";
    return this._httpClient.get<ListResponseModel<Customer>>(newPath);
  }
}
