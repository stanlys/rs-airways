import { AirportForm, Flight, Passengers } from './main.interfaces';

interface FlightSearchFormValue {
  isOneWay: boolean;
  airport: {
    fromLoc: AirportForm;
    toLoc: AirportForm;
  };
  dates: {
    fromDate: Date;
    toDate: Date | null;
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
