import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-flights-calendar',
  templateUrl: './flights-calendar.component.html',
  styleUrls: ['./flights-calendar.component.scss'],
})
export class FlightsCalendarComponent {
  @Input() public return = false;
}
