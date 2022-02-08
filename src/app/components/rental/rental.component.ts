import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  constructor(private _rentalService : RentalService, private _activatedRoute:ActivatedRoute) { }

  rentals:Rental[] = [];
  rentalDetails:Rental;
  dataLoaded = false;

  showRentals(){
    this._rentalService.getRentals().subscribe(response => {
      this.rentals = response.data;
      this.dataLoaded = true;
    });
  }

  showRentalByCarId(carId:number){
    this._rentalService.getRentalByCarId(carId).subscribe(response=>{
      this.rentalDetails = response;
    });
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params=>{
      if (params["carId"]) {
        this.showRentalByCarId(params["carId"]);
      } 
      else {
        this.showRentals();
      }
    });
  }


}
