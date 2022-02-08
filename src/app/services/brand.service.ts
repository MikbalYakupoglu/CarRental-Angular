import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private _httpClient: HttpClient) { }

  apiUrl = "https://localhost:44309/api/brands/";


  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl + "getall";
    return this._httpClient.get<ListResponseModel<Brand>>(newPath);
  }
}
