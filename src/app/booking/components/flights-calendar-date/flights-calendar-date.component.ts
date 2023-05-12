import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Flight } from '../../../shared/models/flight-search.interfaces';

@Component({
  selector: 'app-flights-calendar-date',
  templateUrl: './flights-calendar-date.component.html',
  styleUrls: ['./flights-calendar-date.component.scss'],
})
export class FlightsCalendarDateComponent implements OnChanges {
  @Input() public date!: Date;

  @Input() public flight?: Flight;

  @Input() public selectedFlightNumber?: string;

  public selected?: boolean;

  @Input() public last!: boolean;

  @Output() public selectedChange = new EventEmitter<string>();

  public ngOnChanges(): void {
    this.selected = this.flight?.flightNumber === this.selectedFlightNumber;
  }

  public select(): void {
    if (this.flight != null) {
      this.selectedChange.emit(this.flight.flightNumber);
    }
  }
}
