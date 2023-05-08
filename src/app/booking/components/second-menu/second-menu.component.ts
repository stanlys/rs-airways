import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { FlightSearchFormValue } from '../../../main/models/flight-search.model';
import { SearchService } from '../../../main/services/search.service';

// {
//   "oneWay": false,
//   "airport": {
//       "from": {
//           "name": "John F. Kennedy International Airport",
//           "city": "New York",
//           "country": "United States",
//           "IATA": "JFK"
//       },
//       "to": {
//           "name": "Los Angeles International Airport",
//           "city": "Los Angeles",
//           "country": "United States",
//           "IATA": "LAX"
//       }
//   },
//   "dates": {
//       "from": "2023-05-05T21:00:00.000Z",
//       "to": "2023-05-12T21:00:00.000Z",
//       "oneWay": null
//   },
//   "passengers": {
//       "adult": 2,
//       "child": 0,
//       "infant": 0
//   }
// }

@Component({
  selector: 'app-second-menu',
  templateUrl: './second-menu.component.html',
  styleUrls: ['./second-menu.component.scss'],
})
export class SecondMenuComponent implements OnDestroy {
  public showSearchForm = true;

  public requestData$: BehaviorSubject<FlightSearchFormValue | null>;

  public requestData?: FlightSearchFormValue;

  public fromCity = '';

  public toCity?: string;

  public fromDate?: string | Date;

  public toDate?: string | Date;

  public passengerAmount = 0;

  public oneWay = false;

  private destroy$ = new Subject<void>();

  constructor(private searchService: SearchService) {
    this.requestData$ = this.searchService.requestData$;
    this.searchService.requestData$.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      if (v != null) {
        this.requestData = v;
        this.oneWay = v.oneWay;
        this.fromCity = v.airport.from.city;
        this.toCity = v.airport.to.city;
        this.fromDate = new Date(v.dates.from);
        this.toDate = v.dates.to ? new Date(v.dates.to) : undefined;
        this.passengerAmount = Object.values(v.passengers).reduce((a: number, b: number) => a + b, 0) as number;
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
