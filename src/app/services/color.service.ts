import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private _httpClient:HttpClient) { }


  apiUrl:string = "https://localhost:44309/api/colors/";

  getColors():Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl+"getall";
    return this._httpClient.get<ListResponseModel<Color>>(newPath);
  }


}
