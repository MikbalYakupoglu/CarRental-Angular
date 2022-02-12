import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, mergeMap, Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private _httpClient : HttpClient) { }


  apiUrl:string = "https://localhost:44309/api/";

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl+ "cars/getcardetails";
    return this._httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbybrand?brandId="+brandId;
    return this._httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarsbycolor?colorId="+ colorId;
    return this._httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByFilter(brandId:number, colorId:number){
    let newPath = this.apiUrl + "cars/getcarsbyfilter?brandId="+ brandId + "&colorId="+colorId;
    return this._httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarById(carId:number):Observable<SingleResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getcarbyid?carId="+carId;
    return this._httpClient.get<SingleResponseModel<Car>>(newPath);
  } 

  getCarImage(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl+"carimages/listbycarid?carId="+carId;
    return this._httpClient.get<ListResponseModel<CarImage>>(newPath);
  }
  
}
