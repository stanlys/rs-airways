import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ControlService } from '../../../core/services/control.service';
import { Flight } from '../../../shared/models/flight-search.interfaces';
import { SearchService } from '../../../shared/services/search.service';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss'],
})
export class BookingPageComponent implements OnDestroy {
  public flights?: Flight[];

  public showSearchForm = false;

  public flightsConfirmed: boolean[] = [];

  private flightsSub: Subscription;

  constructor(private controlService: ControlService, searchService: SearchService) {
    this.flightsSub = searchService.flights$.subscribe((v) => {
      if (v != null) {
        this.flights = v;
        this.flightsConfirmed = <boolean[]>Array(v.length).fill(false);
      }
    });
  }

  public ngOnDestroy(): void {
    this.flightsSub.unsubscribe();
  }

  public back(): void {
    this.controlService.stepper.previous();
  }

  public forward(): void {
    this.controlService.stepper.next();
  }

  public onFlightConfirmed(i: number, v: boolean): void {
    this.flightsConfirmed[i] = v;
  }

  public checkAllFlights(): boolean {
    return this.flightsConfirmed.every(Boolean);
  }
}
