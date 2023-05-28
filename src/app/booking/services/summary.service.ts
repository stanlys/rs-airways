import { Injectable } from '@angular/core';

import { IPassenger } from '../interfaces/passenger';
import { ISummaryFare, ITrip } from '../interfaces/flight';
import { Prices } from '../../shared/models/flight-search.interfaces';
import { PassengersService } from './passengers.service';
import { PriceService } from '../../shared/services/price.service';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  private adultAge = 14;

  private infantAge = 2;

  private summaryFlight?: ITrip;

  constructor(private priceService: PriceService, private passengers: PassengersService) {}

  public getSummaryByAge(allPassengers: Array<IPassenger>): Array<ISummaryFare> {
    const result = new Array<ISummaryFare>(3).fill({
      count: 0,
      fare: this.priceService.initPrice,
      tax: this.priceService.initPrice,
    });

    if (!allPassengers) return [];

    allPassengers.forEach((passenger) => {
      if (passenger.age >= this.adultAge) {
        const currentValue = result[0];
        result[0] = {
          count: currentValue.count + 1,
          fare: this.priceService.sumPrice(currentValue.fare, passenger.fare),
          tax: this.priceService.sumPrice(currentValue.tax, passenger.tax),
        };
      } else if (passenger.age < this.infantAge) {
        const currentValue = result[2];
        result[2] = {
          count: currentValue.count + 1,
          fare: this.priceService.sumPrice(currentValue.fare, passenger.fare),
          tax: this.priceService.sumPrice(currentValue.tax, passenger.tax),
        };
      } else {
        const currentValue = result[1];
        result[1] = {
          count: currentValue.count + 1,
          fare: this.priceService.sumPrice(currentValue.fare, passenger.fare),
          tax: this.priceService.sumPrice(currentValue.tax, passenger.tax),
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
