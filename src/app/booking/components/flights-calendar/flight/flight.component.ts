import { Component, Input } from '@angular/core';

import { Flight } from '../../../../main/models/main.interfaces';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
})
export class FlightComponent {
  @Input() public flight!: Flight;
}
