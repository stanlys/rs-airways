import { Component, Input, OnInit } from '@angular/core';
import { Flight } from '../../../shared/models/flight-search.interfaces';

@Component({
  selector: 'app-flights-calendar-date',
  templateUrl: './flights-calendar-date.component.html',
  styleUrls: ['./flights-calendar-date.component.scss'],
})
export class FlightsCalendarDateComponent implements OnInit {
  @Input() public date!: Date;

  @Input() public flight?: Flight;

  @Input() public selectedFlightNumber?: string;

  public selected?: boolean;

  @Input() public last!: boolean;

  public ngOnInit(): void {
    this.selected = this.flight?.flightNumber === this.selectedFlightNumber;
  }
}
