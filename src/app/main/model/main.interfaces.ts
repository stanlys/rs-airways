export interface Airport {
  city: string;
  code: string;
  name?: string;
  country: string;
}

export interface Passengers {
  adult: number;
  child: number;
  infant: number;
}

export interface FlightSearchRequest {
  from: Airport;
  to: Airport;
  oneWay: boolean;
  dateFrom: Date;
  dateTo: Date;
  passengers: Passengers;
}
