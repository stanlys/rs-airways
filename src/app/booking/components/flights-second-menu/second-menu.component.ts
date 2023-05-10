import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { FlightSearchFormValue } from '../../../shared/models/flight-search.model';
import { SearchService } from '../../../shared/services/search.service';

@Component({
  selector: 'app-second-menu',
  templateUrl: './second-menu.component.html',
  styleUrls: ['./second-menu.component.scss'],
})
export class SecondMenuComponent implements OnDestroy {
  public requestData$: BehaviorSubject<FlightSearchFormValue | null>;

  public requestData?: FlightSearchFormValue;

  public fromCity = '';

  public toCity?: string;

  public fromDate?: Date | null;

  public toDate?: Date | null;

  public oneWayDate?: Date | null;

  public passengerAmount = 0;

  public isOneWay = false;

  @Output() public toggleSearchForm = new EventEmitter<void>();

  private destroy$ = new Subject<void>();

  constructor(private searchService: SearchService) {
    this.requestData$ = this.searchService.requestData$;
    this.searchService.requestData$.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      if (v != null) {
        this.requestData = v;
        this.isOneWay = v.isOneWay;
        this.fromCity = v.airport.fromLoc.city;
        this.toCity = v.airport.toLoc.city;
        this.fromDate = new Date(v.dates.takeoffDate);
        this.toDate = v.dates.landingDate ? new Date(v.dates.landingDate) : null;
        this.passengerAmount = Object.values(v.passengers).reduce((a: number, b: number) => a + b, 0) as number;
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
