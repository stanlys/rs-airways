import { Prices } from '../../shared/models/flight-search.interfaces';

export interface IPassenger {
  nameFull: string;
  age: number;
  luggage: number;
  cabinBag: number;
  seat: string;
  fare: Prices;
  tax: Prices;
}
