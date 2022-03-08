import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private _httpClient:HttpClient) { }

  apiUrl:string = "https://localhost:44309/api/";

  getColors():Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl + "colors/";
    return this._httpClient.get<ListResponseModel<Color>>(newPath);
  }

  addColor(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "colors/";
    return this._httpClient.post<ResponseModel>(newPath,color);
  }

  deleteColor(colorId:number){
    let newPath = this.apiUrl + "colors/";
    return this._httpClient.delete<ResponseModel>(newPath+colorId)
  }


}
