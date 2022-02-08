import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  constructor(private _colorService : ColorService) { }

  colors:Color[] = [];
  currentColor:Color;
  dataLoaded = false;

  showColors(){
    this._colorService.getColors().subscribe(response=>{
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }

  getCurrentColor(color:Color){
    this.currentColor = color;
  }

  setCurrentColorClass(color:Color){
    if (color != this.currentColor) {
      return "list-group-item";
    }
    else{
      return "list-group-item active";
    }

  }

  ngOnInit(): void {
    this.showColors();
  }

}
