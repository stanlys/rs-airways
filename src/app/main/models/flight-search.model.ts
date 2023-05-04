import { AirportForm, Flight, Passengers } from './main.interfaces';

interface FlightSearchFormValue {
  airport: {
    from: AirportForm;
    to: AirportForm;
  };
  dates: {
    from: Date;
    to?: Date;
  };
  passengers: Passengers;
  oneWay: boolean;
}

interface FlightSearchRequest {
  fromKey: string;
  toKey: string;
  forwardDate: string;
  backDate?: string;
}

type FlightSearchResponse = Flight[];

export type { FlightSearchFormValue, FlightSearchRequest, FlightSearchResponse };
