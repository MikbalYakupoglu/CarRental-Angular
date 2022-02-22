import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourlyPrice'
})
export class HourlyPricePipe implements PipeTransform {

  transform(value:number): number {
    return value/24;
  }

}
