export interface AirportForm {
  city: string;
  IATA: string;
  name?: string;
  country: string;
}

export interface AirportRes {
  key: string;
  country: string;
  city: string;
  name: string;
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

export interface Flight {
  avaible: number;
  flightNumber: string;
  timeMins: number;
  form: AirportRes;
  to: AirportRes;
  takeoffDate: string;
  landingDate: string;
  prices: Record<string, Price>;
  price: Price;
}
