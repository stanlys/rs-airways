import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import dayjs from 'dayjs';

import { Flight } from '../../../shared/models/flight-search.interfaces';

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

  public ngOnInit(): void {
    const { otherFlights, ...flight } = this.flight;
    this.flights = [...Object.values(otherFlights || {}), flight];

    this.determineDefaultSelectedFlight();
  }

  private determineDefaultSelectedFlight(): void {
    const nextFlight = this.flights.find(({ takeoffDate }) => Date.now() <= new Date(takeoffDate).getTime());

    if (dayjs().diff(dayjs(this.flight.takeoffDate), 'millisecond') > 0 && nextFlight) {
      this.selectedFlight = nextFlight;
    } else {
      this.selectedFlight = this.flight;
    }
  }
}
