import { ITrip } from 'src/app/booking/interface/flight';

export function getNumber(trip: ITrip): string {
  return trip.to !== null ? `${trip.from.number} - ${trip.to.number}` : `${trip.from.number}`;
}

export function getFlight(trip: ITrip): string {
  const flightFrom = `${trip.from.from} - ${trip.from.to}`;
  const flightTo = trip.to !== null ? `${trip.to.from} - ${trip.to.to}` : '';
  return [flightFrom, flightTo].join(', ');
}

export function getFlightType(trip: ITrip): string {
  return trip.to !== null ? 'Round Trip' : 'One way';
}

export function getDateTime(trip: ITrip): string {
  return 'DATE';
}

export function getPrice(trip: ITrip): number {
  const priceFrom = trip.from.price;
  const priceTo = trip.to?.price || 0;
  return priceFrom + priceTo;
}
