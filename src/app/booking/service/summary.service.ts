import { Injectable } from '@angular/core';
import { INIT_SUMMARY_FARE, ISummaryFare, ISummaryFlight } from '../interface/flight';
import { IPassenger } from '../interface/passenger';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  private adultAge = 14;

  private infantAge = 2;

  public getSummaryByAge(flights: Array<ISummaryFlight>): Array<ISummaryFare> {
    const result: Array<ISummaryFare> = [INIT_SUMMARY_FARE, INIT_SUMMARY_FARE, INIT_SUMMARY_FARE];
    const allPassengers: Array<IPassenger> = [];
    flights.forEach((flight) => allPassengers.push(...flight.passengers));
    allPassengers.forEach((passenger) => {
      if (passenger.age >= this.adultAge) {
        const currentValue = result[0];
        result[0] = {
          count: currentValue.count + 1,
          fare: currentValue.fare + passenger.fare,
          tax: currentValue.tax + passenger.tax,
        };
      } else if (passenger.age <= this.infantAge) {
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
    return result;
  }
}
