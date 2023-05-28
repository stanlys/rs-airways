import { Injectable } from '@angular/core';

import { IPassenger } from '../interfaces/passenger';
import { INIT_SUMMARY_FARE, ISummaryFare, ITrip } from '../interfaces/flight';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  private adultAge = 14;

  private infantAge = 2;

  private summaryFlight?: ITrip;

  public getSummaryByAge(allPassengers: Array<IPassenger>): Array<ISummaryFare> {
    const result: Array<ISummaryFare> = [INIT_SUMMARY_FARE, INIT_SUMMARY_FARE, INIT_SUMMARY_FARE];

    if (!allPassengers) return [];

    allPassengers.forEach((passenger) => {
      if (passenger.age >= this.adultAge) {
        const currentValue = result[0];
        result[0] = {
          count: currentValue.count + 1,
          fare: currentValue.fare + passenger.fare,
          tax: currentValue.tax + passenger.tax,
        };
      } else if (passenger.age < this.infantAge) {
        const currentValue = result[2];
        result[2] = {
          count: currentValue.count + 1,
          fare: currentValue.fare + passenger.fare,
          tax: currentValue.tax + passenger.tax,
        };
      } else {
        const currentValue = result[1];
        result[1] = {
          count: currentValue.count + 1,
          fare: currentValue.fare + passenger.fare,
          tax: currentValue.tax + passenger.tax,
        };
      }
    });
    console.log(result);

    return result;
  }

  public setSummary(flight: ITrip): void {
    this.summaryFlight = flight;
  }

  public getSummary(): ITrip | undefined {
    return this.summaryFlight;
  }
}
