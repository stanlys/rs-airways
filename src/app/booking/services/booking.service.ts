import { Injectable } from '@angular/core';
import dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  public minutesOffset = 60 * 6;

  // eslint-disable-next-line class-methods-use-this
  public isRelevantFlight(takeoffDate: dayjs.ConfigType, isFirstFlight: boolean): boolean {
    const todayOnwards = dayjs.utc(takeoffDate).diff(dayjs.utc(), 'day') >= 0;
    const available = isFirstFlight || dayjs.utc(takeoffDate).diff(dayjs.utc(), 'minute') >= this.minutesOffset;
    return todayOnwards && available;
  }
}
