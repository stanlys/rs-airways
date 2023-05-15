import { Pipe, PipeTransform } from '@angular/core';
import { Flight } from '../../shared/models/flight-search.interfaces';

@Pipe({
  name: 'findFlight',
})
export class FindFlightPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  public transform(flights: Flight[], date: Date): Flight | undefined {
    const flight = flights.find(
      (item) =>
        Date.now() <= new Date(item.takeoffDate).getTime() &&
        new Date(item.takeoffDate).getUTCDate() === date.getUTCDate()
    );
    return flight;
  }
}
