import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Flight } from '../../../shared/models/flight-search.interfaces';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
})
export class FlightComponent {
  @Input() public flight?: Flight;

  @Input() public odd!: boolean;

  @Input() public confirmed!: boolean;

  @Output() public confirmedChange = new EventEmitter<Flight | undefined>();

  @Input() public isFirstFlight = false;
}
