import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Flight } from '../../../shared/models/flight-search.interfaces';

@Component({
  selector: 'app-flights-calendar',
  templateUrl: './flights-calendar.component.html',
  styleUrls: ['./flights-calendar.component.scss'],
})
export class FlightsCalendarComponent implements OnInit {
  @Input() public flight!: Flight;

  @Input() public showSearchForm!: boolean;

  @Output() public hideForm = new EventEmitter<void>();

  @Input() public odd!: boolean;

  public dates: Date[] = [];

  public flights: Flight[] = [];

  public ngOnInit(): void {
    this.dates = this.generateStartingDates();
    const { otherFlights, ...flight } = this.flight;
    this.flights = [...Object.values(otherFlights || {}), flight];
  }

  public decrementDate(): void {
    const firstDate = new Date(this.dates[0]);
    firstDate.setDate(firstDate.getDate() - 1);
    const dates = [firstDate, ...this.dates.slice(0, -1)];
    this.dates = dates;
  }

  public incrementDate(): void {
    const lastDate = new Date(this.dates[this.dates.length - 1]);
    lastDate.setDate(lastDate.getDate() + 1);
    const dates = [...this.dates.slice(1), lastDate];
    this.dates = dates;
  }

  private generateStartingDates(): Date[] {
    return Array.from({ length: 5 }, (_, i) => {
      const currentDate = new Date(this.flight.takeoffDate);
      currentDate.setDate(currentDate.getDate() - 2 + i);
      return currentDate;
    });
  }
}
