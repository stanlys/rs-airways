import { Prices } from '../../shared/models/flight-search.interfaces';
import { IPassenger } from './passenger';

export interface ISummaryFlight {
  number: string;
  dates: string;
  times: string;
  from: string;
  to: string;
  passengers: Array<IPassenger>;
}

export interface ISummaryFare {
  count: number;
  fare: number;
  tax: number;
}

export const INIT_SUMMARY_FARE = {
  count: 0,
  fare: 0,
  tax: 0,
};

export interface ISummaryLang {
  [key: string]: string;
}

export interface ISummaryTrip {
  number: string;
  dates: string;
  times: string;
  from: string;
  to: string;
  price: Prices;
}

export interface ITrip {
  from: ISummaryTrip;
  to: ISummaryTrip | null;
  passengers: Array<IPassenger>;
}
