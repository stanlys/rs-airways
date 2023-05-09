import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flight } from '../../../main/models/main.interfaces';

@Component({
  selector: 'app-flights-calendar',
  templateUrl: './flights-calendar.component.html',
  styleUrls: ['./flights-calendar.component.scss'],
})
export class FlightsCalendarComponent {
  @Input() public flight!: Flight;

  @Input() public showSearchForm!: boolean;

  @Output() public hideForm = new EventEmitter<void>();
}
