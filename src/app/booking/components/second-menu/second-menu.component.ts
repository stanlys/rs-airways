import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { FlightSearchFormValue } from '../../../main/models/flight-search.model';
import { SearchService } from '../../../main/services/search.service';

// TODO: remove comment
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
  public showSearchForm = false;

  public requestData$: BehaviorSubject<FlightSearchFormValue | null>;

  public requestData?: FlightSearchFormValue;

  public fromCity = '';

  public toCity?: string;

  public fromDate?: Date | null;

  public toDate?: Date | null;

  public oneWayDate?: Date | null;

  public passengerAmount = 0;

  public isOneWay = false;

  private destroy$ = new Subject<void>();

  constructor(private searchService: SearchService) {
    this.requestData$ = this.searchService.requestData$;
    this.searchService.requestData$.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      if (v != null) {
        this.requestData = v;
        this.isOneWay = v.isOneWay;
        this.fromCity = v.airport.fromLoc.city;
        this.toCity = v.airport.toLoc.city;
        this.fromDate = new Date(v.dates.fromDate);
        this.toDate = v.dates.toDate ? new Date(v.dates.toDate) : null;
        this.passengerAmount = Object.values(v.passengers).reduce((a: number, b: number) => a + b, 0) as number;
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
