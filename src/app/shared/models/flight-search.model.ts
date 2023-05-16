import { AirportForm, Flight, Passengers } from './flight-search.interfaces';

interface FlightSearchFormValue {
  airport: {
    fromLoc: AirportForm;
    toLoc: AirportForm;
  };
  dates: {
    takeoffDate: Date;
    landingDate: Date | null;
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
