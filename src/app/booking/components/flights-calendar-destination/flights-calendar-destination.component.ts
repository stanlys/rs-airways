import { Component, Input } from '@angular/core';

import { Flight } from '../../../shared/models/flight-search.interfaces';

@Component({
  selector: 'app-flights-calendar-destination',
  templateUrl: './flights-calendar-destination.component.html',
  styleUrls: ['./flights-calendar-destination.component.scss'],
})
export class FlightsCalendarDestinationComponent {
  @Input() public flight!: Flight;

  @Input() public odd!: boolean;
}
