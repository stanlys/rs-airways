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
  defaultAmount: number;
};

export type PassengersInfo = {
  adult: PassengerInfo;
  child: PassengerInfo;
  infant: PassengerInfo;
};

export const PASSENGERS: PassengersInfo = {
  adult: {
    name: 'Adult',
    description: '14+ years',
    inputName: 'adult',
    defaultAmount: 1,
  },
  child: {
    name: 'Child',
    description: '2-14 years',
    inputName: 'child',
    defaultAmount: 0,
  },
  infant: {
    name: 'Infant',
    description: '0-2 years',
    inputName: 'infant',
    defaultAmount: 1,
  },
};

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
