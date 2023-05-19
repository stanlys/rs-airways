/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { ITrip } from 'src/app/booking/interface/flight';

@Injectable({
  providedIn: 'root',
})
export class TripListService {
  public getNumber(trip: ITrip): string {
    return trip.to !== null ? `${trip.from.number} - ${trip.to.number}` : `${trip.from.number}`;
  }

  public getFlight(trip: ITrip): string {
    const flightFrom = `${trip.from.from} - ${trip.from.to}`;
    const flightTo = trip.to !== null ? `${trip.to.from} - ${trip.to.to}` : '';
    return [flightFrom, flightTo].join(', ');
  }

  public getFlightType(trip: ITrip): string {
    return trip.to !== null ? 'Round Trip' : 'One way';
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
