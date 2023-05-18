import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isToday from 'dayjs/plugin/isToday';

import { BehaviorSubject, Observable, Subject, catchError, of, take, timeout } from 'rxjs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passengersValidator } from '../../main/directives/passengers-validator.directive';
import { API_BASE_URL, STORAGE_KEY_PREFIX } from '../constants';
import { AirportForm, Flight } from '../models/flight-search.interfaces';
import { FlightSearchFormValue, FlightSearchRequest, FlightSearchResponse } from '../models/flight-search.model';

dayjs.extend(utc);
dayjs.extend(isToday);

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public requestData$ = new BehaviorSubject<FlightSearchFormValue | null>(null);

  public flights$ = new BehaviorSubject<FlightSearchResponse | null>(null);

  private readonly searchKey = `${STORAGE_KEY_PREFIX}-searchRequest`;

  private readonly flightsKey = `${STORAGE_KEY_PREFIX}-flights`;

  public isLoading$ = new Subject<boolean>();

  public searchForm: FormGroup;

  public timeout$ = new Subject<void>();

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.recoverStorageEntries();
    this.searchForm = this.createSearchForm();
  }

  public update(v: FlightSearchFormValue): void {
    this.isLoading$.next(true);

    this.requestData$.next(v);
    localStorage.setItem(this.searchKey, JSON.stringify(v));

    const data = SearchService.transformFormValueToReqScheme(v);

    this.searchRequest(data).subscribe((res) => {
      if (res != null) {
        this.flights$.next(res);
        localStorage.setItem(this.flightsKey, JSON.stringify(res));
      }

      this.isLoading$.next(false);
    });
  }

  private recoverStorageEntries(): void {
    const request = localStorage.getItem(this.searchKey);

    if (request) {
      this.requestData$.next(JSON.parse(request) as FlightSearchFormValue);
    }

    const response = localStorage.getItem(this.flightsKey);

    if (response) {
      this.flights$.next(JSON.parse(response) as Flight[]);
    }
  }

  private createSearchForm(): FormGroup {
    const { fb } = this;
    return fb.group({
      oneWay: fb.control<boolean>(false, Validators.required),
      airport: fb.group({
        fromLoc: fb.control<AirportForm | null>(null, Validators.required),
        toLoc: fb.control<AirportForm | null>(null, Validators.required),
      }),
      dates: fb.group({
        takeoffDate: fb.control<Date | null>(null, Validators.required),
        landingDate: fb.control<Date | null>(null, Validators.required),
      }),
      // TODO: ensure passengers value is properly filled on mount
      passengers: fb.group({
        adult: fb.control<number>(0, [Validators.required, Validators.min(1), passengersValidator]),
        child: fb.control<number>(0, Validators.required),
        infant: fb.control<number>(0, Validators.required),
      }),
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error | undefined): Observable<T> => {
      console.error(operation, error);

      if (error?.name === 'TimeoutError') {
        this.timeout$.next();
      }

      return of(result as T);
    };
  }

  private searchRequest(v: FlightSearchRequest): Observable<FlightSearchResponse | null> {
    const url = `${API_BASE_URL}search/flight`;
    return this.http
      .post<FlightSearchResponse>(url, v)
      .pipe(take(1), timeout(6000), catchError(this.handleError('search', null)));
  }

  private static transformFormValueToReqScheme(v: FlightSearchFormValue): FlightSearchRequest {
    const { airport, dates, oneWay } = v;
    const { fromLoc, toLoc } = airport;
    const { IATA: fromKey } = fromLoc;
    const { IATA: toKey } = toLoc;
    let forwardDate = dayjs(dates.takeoffDate).toISOString();
    const backDate = oneWay !== true ? dayjs(dates.landingDate).toISOString() : undefined;

    if (dayjs(dates.takeoffDate).isToday()) {
      forwardDate = dayjs().add(1, 'hour').toISOString();
    }

    const requestData: FlightSearchRequest = {
      fromKey,
      toKey,
      forwardDate,
      backDate,
    };

    return requestData;
  }
}
