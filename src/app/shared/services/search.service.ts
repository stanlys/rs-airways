import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import utc from 'dayjs/plugin/utc';

import { BehaviorSubject, Observable, Subject, catchError, of, take, timeout } from 'rxjs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private fb: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar) {
    this.searchForm = this.createSearchForm();
    this.recoverStorageEntries();
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
      const parsedRequest = JSON.parse(request) as FlightSearchFormValue;
      this.requestData$.next(parsedRequest);
      this.searchForm.setValue(parsedRequest);
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
      passengers: fb.group({
        adult: fb.control<number>(0, [Validators.required, Validators.min(1), passengersValidator]),
        child: fb.control<number>(0, Validators.required),
        infant: fb.control<number>(0, Validators.required),
      }),
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse | undefined): Observable<T> => {
      console.error(operation, error);

      this.flights$.next(null);
      localStorage.removeItem(this.flightsKey);

      this.snackBar.open(error?.message || 'Unknown error', 'Close', {
        duration: 3000,
      });

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
