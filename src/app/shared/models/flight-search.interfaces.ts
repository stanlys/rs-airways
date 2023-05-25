export interface AirportForm {
  city: string;
  key: string;
  name: string;
  country: string;
  gmt?: string;
}

interface AirportRes {
  key: string;
  country: string;
  city: string;
  name: string;
  gmt: string;
}

export interface Passengers {
  adult: number;
  child: number;
  infant: number;
}

export type PassengerInfo = {
  name: string;
  description: string;
  inputName: string;
  defaultAmount?: number;
};

export interface PassSelectOption {
  name: string;
  amount: number;
}

export interface Price {
  eur: number;
  usd: number;
  rub: number;
  pln: number;
}

export type CurrencyCode = Uppercase<keyof Price>;

export interface Seats {
  total: number;
  avaible: number;
}

export interface Flight {
  seats: Seats;
  flightNumber: string;
  timeMins: number;
  form: AirportRes;
  to: AirportRes;
  takeoffDate: string;
  landingDate: string;
  price: Price;
  otherFlights?: Record<string, Flight> | Record<string, never>;
}
