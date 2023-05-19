import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

import { Flight } from '../../shared/models/flight-search.interfaces';
import { BookingService } from '../services/booking.service';

@Pipe({
  name: 'findFlight',
})
export class FindFlightPipe implements PipeTransform {
  constructor(private bookingService: BookingService) {}

  // eslint-disable-next-line class-methods-use-this
  public transform(flights: Flight[], date: Date, isFirstFlight: boolean): Flight | undefined {
    const flight = flights.find((item) => {
      return (
        this.bookingService.isRelevantFlight(item.takeoffDate, isFirstFlight) &&
        dayjs.utc(item.takeoffDate).isSame(dayjs.utc(date), 'day')
      );
    });
    return flight;
  }
}
