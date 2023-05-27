import { DatePipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Flight } from '../../../shared/models/flight-search.interfaces';
import { SearchService } from '../../../shared/services/search.service';
import { ISummaryTrip } from '../../interfaces/flight';
import { SummaryService } from '../../services/summary.service';

@Component({
  selector: 'app-flights-page',
  templateUrl: './flights-page.component.html',
  styleUrls: ['./flights-page.component.scss'],
})
export class FlightsPageComponent implements OnDestroy {
  public flights = this.searchService.flights$.asObservable();

  public showSearchForm = false;

  public flightsConfirmed: (undefined | Flight)[] = [];

  private subs = new Subscription();

  public isLoading$;

  public canContinue = false;

  constructor(
    private searchService: SearchService,
    private summaryService: SummaryService,
    private datePipe: DatePipe
  ) {
    const flightsSub = searchService.flights$.subscribe((v) => {
      if (v != null) {
        this.flightsConfirmed = <undefined[]>Array(v.length).fill(undefined);
      }
    });

    this.subs.add(flightsSub);

    this.isLoading$ = searchService.isLoading$;
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onFlightConfirmed(i: number, v: Flight | undefined): void {
    this.flightsConfirmed[i] = v;

    const [fromFlight, toFlight] = this.flightsConfirmed;

    const from = this.transformToSummaryTrip(fromFlight);
    const to = this.transformToSummaryTrip(toFlight);

    if (from) {
      this.summaryService.setSummary({ from, to });
    }

    this.canContinue = this.checkAllFlights();
  }

  public checkAllFlights(): boolean {
    return this.flightsConfirmed.every(Boolean);
  }

  private transformToSummaryTrip(flight: Flight | false | undefined): ISummaryTrip | null {
    if (flight) {
      const { flightNumber: number, takeoffDate, landingDate, form: fromLoc, to: toLoc, price } = flight;
      const { city: from } = fromLoc;
      const { city: to } = toLoc;
      const dates = this.datePipe.transform(takeoffDate, 'd MMM y') || '';
      const takeoffTime = this.datePipe.transform(takeoffDate, 'h:mm') || '';
      const landingTime = this.datePipe.transform(landingDate, 'h:mm') || '';
      const times = `${takeoffTime}-${landingTime}`;

      const summaryTrip: ISummaryTrip = {
        number,
        dates,
        times,
        from,
        to,
        price,
        // TODO: add passengers to summary
        passengers: [],
      };

      return summaryTrip;
    }

    return null;
  }
}
