import { IPassenger } from 'src/app/booking/interfaces/passenger';

export interface IFlight {
  number: string;
  flights: string[];
  typeTrip: string;
  dateTime: string;
  passengers: IPassenger[];
  price: number;
}

export interface IPassengerByAge {
  adult: number;
  child: number;
  infant: number;
}
