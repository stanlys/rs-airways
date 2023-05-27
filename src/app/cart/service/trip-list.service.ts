/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { PriceService } from '../../shared/services/price.service';
import { ITrip } from '../../booking/interfaces/flight';

@Injectable({
  providedIn: 'root',
})
export class TripListService {
  constructor(private translate: TranslateService, private priceService: PriceService) {}

  public getNumber(trip: ITrip): string {
    return trip.to !== null ? `${trip.from.number} - ${trip.to.number}` : `${trip.from.number}`;
  }

  public getFlight(trip: ITrip): string {
    const flightFrom = `${trip.from.from} - ${trip.from.to}`;
    const flightTo = trip.to !== null ? `${trip.to.from} - ${trip.to.to}` : '';
    return [flightFrom, flightTo].join(', ');
  }

  public getFlightType(trip: ITrip): string {
    const tripType = trip.to !== null ? 'ROUND_TRIP' : 'ONE_WAY';
    let result = '';
    this.translate.get(`MAIN_FORM.${tripType}`).subscribe((phrase) => {
      result = phrase as string;
      return true;
    });
    return result;
  }

  public getDateTime(trip: ITrip): string {
    const flightFrom = `${trip.from.dates}, ${trip.from.times}`;
    const flightTo = trip.to !== null ? `${trip.to.dates}, ${trip.to.times}` : '';

    if (trip.to != null) {
      return [flightFrom, flightTo].join(' - ');
    }

    return flightFrom;
  }

  public getPrice(trip: ITrip): number {
    const priceFrom = this.priceService.getPrice(trip.from.price);
    const priceTo = this.priceService.getPrice(trip.to?.price);
    return priceFrom + priceTo;
  }
}
