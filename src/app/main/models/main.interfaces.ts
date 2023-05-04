export interface Airport {
  city: string;
  IATA: string;
  name?: string;
  country: string;
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

export type PassSelectOption = {
  name: string;
  amount: number;
};
