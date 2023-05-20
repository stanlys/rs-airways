/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ITrip } from 'src/app/booking/interfaces/flight';

@Injectable({
  providedIn: 'root',
})
export class TripListService {
  constructor(private translate: TranslateService) {}

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
    return [flightFrom, flightTo].join(' - ');
  }

  public getPrice(trip: ITrip): number {
    const priceFrom = trip.from.price;
    const priceTo = trip.to?.price || 0;
    return priceFrom + priceTo;
  }
}
