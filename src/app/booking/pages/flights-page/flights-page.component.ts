import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '../../../shared/services/search.service';
import { Flight } from '../../../shared/models/flight-search.interfaces';

// TODO: remove comment
// export interface ISummaryTrip {
//   number: string;
//   dates: string;
//   times: string;
//   from: string;
//   to: string;
//   price: number;
//   passengers: Array<IPassenger>;
// }

// export interface ITrip {
//   from: ISummaryTrip;
//   to: ISummaryTrip | null;
// }

@Component({
  selector: 'app-flights-page',
  templateUrl: './flights-page.component.html',
  styleUrls: ['./flights-page.component.scss'],
})
export class FlightsPageComponent implements OnDestroy {
  public flights = this.searchService.flights$.asObservable();

  public showSearchForm = false;

  public flightsConfirmed: (false | Flight)[] = [];

  private subs = new Subscription();

  public isLoading$;

  constructor(private searchService: SearchService) {
    const flightsSub = searchService.flights$.subscribe((v) => {
      if (v != null) {
        this.flightsConfirmed = <false[]>Array(v.length).fill(false);
      }
    });

    this.subs.add(flightsSub);

    this.isLoading$ = searchService.isLoading$;
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onFlightConfirmed(i: number, v: Flight | false): void {
    this.flightsConfirmed[i] = v;
  }

  public checkAllFlights(): boolean {
    return this.flightsConfirmed.every(Boolean);
  }
}
