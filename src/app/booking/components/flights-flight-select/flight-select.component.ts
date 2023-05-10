import { Component, Input } from '@angular/core';
import { Flight } from '../../../shared/models/flight-search.interfaces';

@Component({
  selector: 'app-flight-select',
  templateUrl: './flight-select.component.html',
  styleUrls: ['./flight-select.component.scss'],
})
export class FlightSelectComponent {
  @Input() public flight!: Flight;
}
