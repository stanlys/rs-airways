import { Component, Input } from '@angular/core';

import { Flight } from '../../../shared/models/flight-search.interfaces';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
})
export class FlightComponent {
  @Input() public flight!: Flight;

  @Input() public odd!: boolean;
}
