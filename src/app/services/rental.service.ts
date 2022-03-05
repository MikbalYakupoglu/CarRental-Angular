import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private _httpClient : HttpClient) { }

  apiUrl:string = "https://localhost:44309/api/";

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl+"rentals/getrentaldetails";
    return this._httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalByCarId(carId:number):Observable<Rental>{
    let newPath = this.apiUrl + "rentals/getrentaldetailsbycarid/"+carId;
    return this._httpClient.get<Rental>(newPath);
  }
}
