import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import dayjs from 'dayjs';

import { Flight } from '../../../shared/models/flight-search.interfaces';

@Component({
  selector: 'app-flights-calendar',
  templateUrl: './flights-calendar.component.html',
  styleUrls: ['./flights-calendar.component.scss'],
})
export class FlightsCalendarComponent implements OnInit {
  @Input() public selectedFlight?: Flight;

  @Input() public selectedFlightNumber?: string;

  @Output() public selectedFlightChange = new EventEmitter<Flight>();

  public dates: Date[] = [];

  @Input() public flights!: Flight[];

  @Input() public firstFlight = false;

  public ngOnInit(): void {
    if (this.selectedFlight != null) {
      this.dates = FlightsCalendarComponent.generateStartingDates(this.selectedFlight.takeoffDate);
    }
  }

  public decrementDate(): void {
    const firstDate = dayjs(this.dates[0]).subtract(1, 'day').toDate();
    this.dates = [firstDate, ...this.dates.slice(0, -1)];
  }

  public incrementDate(): void {
    const lastDate = dayjs(this.dates[this.dates.length - 1])
      .add(1, 'day')
      .toDate();
    this.dates = [...this.dates.slice(1), lastDate];
  }

  public selectDate(v: string): void {
    const flight = this.flights.find((f) => f.flightNumber === v);
    if (flight) {
      this.selectedFlightChange.emit(flight);
      this.selectedFlightNumber = flight.flightNumber;
    }
  }

  private static generateStartingDates(defaultDateStr: string): Date[] {
    return Array.from({ length: 5 }, (_, i) => {
      return dayjs(defaultDateStr).subtract(2, 'day').add(i, 'day').toDate();
    });
  }
}
