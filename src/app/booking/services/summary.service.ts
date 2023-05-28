import { Injectable } from '@angular/core';

import { IPassenger } from '../interfaces/passenger';
import { INIT_SUMMARY_FARE, ISummaryFare, ISummaryTrip, ITrip } from '../interfaces/flight';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  private adultAge = 14;

  private infantAge = 2;

  private summaryFlight?: ITrip;

  public getSummaryByAge(flights: Array<ISummaryTrip>): Array<ISummaryFare> {
    const result: Array<ISummaryFare> = [INIT_SUMMARY_FARE, INIT_SUMMARY_FARE, INIT_SUMMARY_FARE];
    const allPassengers: Array<IPassenger> = [];
    const passengerSet = new Set();
    let adding = 0;
    flights.forEach((flight) => allPassengers.push(...flight.passengers));
    allPassengers.forEach((passenger) => {
      if (passengerSet.has(passenger.nameFull)) {
        adding = 0;
      } else {
        adding = 1;
        passengerSet.add(passenger.nameFull);
      }
      if (passenger.age >= this.adultAge) {
        const currentValue = result[0];
        result[0] = {
          count: currentValue.count + adding,
          fare: currentValue.fare + passenger.fare,
          tax: currentValue.tax + passenger.tax,
        };
      } else if (passenger.age <= this.infantAge) {
        const currentValue = result[2];
        result[2] = {
          count: currentValue.count + adding,
          fare: currentValue.fare + passenger.fare,
          tax: currentValue.tax + passenger.tax,
        };
      } else {
        const currentValue = result[1];
        result[1] = {
          count: currentValue.count + adding,
          fare: currentValue.fare + passenger.fare,
          tax: currentValue.tax + passenger.tax,
        };
      }
    });
    return result;
  }

  public setSummary(flight: ITrip): void {
    this.summaryFlight = flight;
  }

  public getSummary(): ITrip | undefined {
    return this.summaryFlight;
  }
}
