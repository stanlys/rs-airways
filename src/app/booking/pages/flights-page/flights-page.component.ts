import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProgressControlService } from '../../../core/services/progress-control.service';
import { SearchService } from '../../../shared/services/search.service';

@Component({
  selector: 'app-flights-page',
  templateUrl: './flights-page.component.html',
  styleUrls: ['./flights-page.component.scss'],
})
export class FlightsPageComponent implements OnDestroy {
  public flights = this.searchService.flights$.getValue();

  public showSearchForm = false;

  public flightsConfirmed: boolean[] = [];

  private subs = new Subscription();

  public isLoading$;

  public selectedIndex$;

  constructor(controlService: ProgressControlService, private searchService: SearchService) {
    const flightsSub = searchService.flights$.subscribe((v) => {
      if (v != null) {
        this.flights = v;
        this.flightsConfirmed = <boolean[]>Array(v.length).fill(false);
      }
    });

    this.subs.add(flightsSub);

    this.isLoading$ = searchService.isLoading$;

    this.selectedIndex$ = controlService.selectedIndex$;
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onFlightConfirmed(i: number, v: boolean): void {
    this.flightsConfirmed[i] = v;
  }

  public checkAllFlights(): boolean {
    return this.flightsConfirmed.every(Boolean);
  }
}
