import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

import { Flight } from '../../shared/models/flight-search.interfaces';

@Pipe({
  name: 'findFlight',
})
export class FindFlightPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  public transform(flights: Flight[], date: Date, firstFlight: boolean): Flight | undefined {
    const flight = flights.find((item) => {
      const todayOnwards = dayjs(item.takeoffDate).diff(dayjs(), 'day') >= 0;
      const inSixHours = firstFlight || dayjs(item.takeoffDate).diff(dayjs(), 'hours') >= 6;
      return todayOnwards && inSixHours && dayjs(item.takeoffDate).isSame(dayjs(date), 'day');
    });
    return flight;
  }
}
