import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

import { Flight } from '../../../shared/models/flight-search.interfaces';
import { BookingService } from '../../services/booking.service';

dayjs.extend(isToday);

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent implements OnInit {
  @Input() public flight!: Flight;

  public flights: Flight[] = [];

  public selectedFlight?: Flight;

  @Input() public showSearchForm!: boolean;

  @Input() public first!: boolean;

  @Input() public odd!: boolean;

  @Input() public confirmed = false;

  @Output() public confirmedChange = new EventEmitter<boolean>();

  constructor(private bookingService: BookingService) {}

  public ngOnInit(): void {
    const { otherFlights, ...flight } = this.flight;
    this.flights = [flight, ...Object.values(otherFlights || {})];

    this.setDefaultSelectedFlight();
  }

  private setDefaultSelectedFlight(): void {
    const nextFlight = this.flights.find(({ takeoffDate }) => {
      return this.bookingService.isRelevantFlight(takeoffDate, this.first);
    });

    if (this.first && nextFlight) {
      this.bookingService.minutesOffset = nextFlight.timeMins;
    }

    this.selectedFlight = nextFlight;
  }
}
