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
  airport: {
    from: Airport;
    to: Airport;
  };
  dates: {
    dateFrom: Date;
    dateTo: Date;
  };
  passengers: Passengers;
  oneWay: boolean;
}
