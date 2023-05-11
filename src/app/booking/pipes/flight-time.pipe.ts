import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flightTime',
})
export class FlightTimePipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  public transform(value: number): null | string {
    if (value == null) {
      return null;
    }

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    return `${hours}h ${minutes}m`;
  }
}
