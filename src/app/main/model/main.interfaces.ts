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

export const PASSENGERS: PassengerInfo[] = [
  {
    name: 'Adult',
    description: '14+ years',
    inputName: 'adult',
    defaultAmount: 0,
  },
  {
    name: 'Child',
    description: '2-14 years',
    inputName: 'child',
    defaultAmount: 0,
  },
  {
    name: 'Infant',
    description: '0-2 years',
    inputName: 'infant',
    defaultAmount: 0,
  },
];
