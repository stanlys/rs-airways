import { Component, Input } from '@angular/core';

import { Flight } from '../../../../shared/models/flight-search.interfaces';

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
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
})
export class FlightComponent {
  @Input() public flight!: Flight;
}
