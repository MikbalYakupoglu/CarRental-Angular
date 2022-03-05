import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private _httpClient: HttpClient) { }

  apiUrl = "https://localhost:44309/api/";


  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl + "brands/";
    return this._httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  addBrand(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "brands/";
    return this._httpClient.post<ResponseModel>(newPath,brand);
  }
}
