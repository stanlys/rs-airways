import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import dayjs from 'dayjs';

import { Flight } from '../../../shared/models/flight-search.interfaces';

@Component({
  selector: 'app-flights-calendar',
  templateUrl: './flights-calendar.component.html',
  styleUrls: ['./flights-calendar.component.scss'],
})
export class FlightsCalendarComponent implements OnInit {
  @Input() public flight!: Flight;

  @Output() public selectedFlightChange = new EventEmitter<Flight>();

  public selectedFlightNumber?: string;

  public dates: Date[] = [];

  public flights: Flight[] = [];

  public ngOnInit(): void {
    this.dates = this.generateStartingDates();
    const { otherFlights, ...flight } = this.flight;
    this.selectedFlightNumber = flight.flightNumber;
    this.flights = [...Object.values(otherFlights || {}), flight];
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

  private generateStartingDates(): Date[] {
    return Array.from({ length: 5 }, (_, i) => {
      return dayjs(this.flight.takeoffDate).subtract(2, 'day').add(i, 'day').toDate();
    });
  }
}
