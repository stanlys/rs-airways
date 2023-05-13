import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flight } from '../../../shared/models/flight-search.interfaces';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent {
  @Input() public flight!: Flight;

  @Input() public showSearchForm!: boolean;

  @Input() public odd!: boolean;

  public selectedFlight?: Flight;

  @Input() public confirmed = false;

  @Output() public confirmedChange = new EventEmitter<boolean>();
}
