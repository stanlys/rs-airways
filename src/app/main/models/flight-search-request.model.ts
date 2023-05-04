import { Airport, Passengers } from './main.interfaces';

export interface FlightSearchRequest {
  airport: {
    from: Airport;
    to: Airport;
  };
  dates: {
    dateFrom?: Date;
    dateTo?: Date;
    date?: Date;
  };
  passengers: Passengers;
  oneWay: boolean;
}
