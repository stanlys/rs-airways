import { Component, Input } from '@angular/core';
import { Flight } from '../../../shared/models/flight-search.interfaces';

// TODO: remove comment
// interface AirportRes {
//   key: string;
//   country: string;
//   city: string;
//   name: string;
//   gmt: string;
// }

// interface Price {
//   eur: number;
//   usd: number;
//   rub: number;
//   pln: number;
// }

// interface Seats {
//   total: number;
//   avaible: number;
// }

// export interface Flight {
//   seats: Seats;
//   flightNumber: string;
//   timeMins: number;
//   form: AirportRes;
//   to: AirportRes;
//   takeoffDate: string;
//   landingDate: string;
//   price: Price;
//   otherFlights?: Record<string, Flight>;
// }

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss'],
})
export class FlightDetailsComponent {
  @Input() public flight!: Flight;

  @Input() public odd!: boolean;
}
