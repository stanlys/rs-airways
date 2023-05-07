import { IPassenger } from './passenger';

export interface ISummaryFlight {
  number: string;
  dates: string;
  times: string;
  from: string;
  to: string;
  passengers: Array<IPassenger>;
}
