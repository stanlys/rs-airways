export interface AirportForm {
  city: string;
  IATA: string;
  name?: string;
  country: string;
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

interface Price {
  eur: number;
  usd: number;
  rub: number;
  pln: number;
}

interface Seats {
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
  otherFlights?: Record<string, Flight>;
}
