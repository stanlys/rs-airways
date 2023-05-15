import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, of, take, timeout } from 'rxjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { API_BASE_URL, STORAGE_KEY_PREFIX } from '../constants';
import { defaultFlights as mockFlights } from '../mock-flights-response';
import { FlightSearchFormValue, FlightSearchRequest, FlightSearchResponse } from '../models/flight-search.model';

dayjs.extend(utc);

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public requestData$ = new BehaviorSubject<FlightSearchFormValue | null>(null);

  public flights$ = new BehaviorSubject<FlightSearchResponse | null>(mockFlights);

  private readonly searchKey = `${STORAGE_KEY_PREFIX}-searchRequest`;

  public isLoading$ = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.init();
  }

  public update(v: FlightSearchFormValue): void {
    this.isLoading$.next(true);

    this.requestData$.next(v);
    localStorage.setItem(this.searchKey, JSON.stringify(v));

    const data = SearchService.transformFormValueToReqScheme(v);

    this.searchRequest(data).subscribe((res) => {
      if (res != null) {
        this.flights$.next(res);
      }

      this.isLoading$.next(false);
    });
  }

  private init(): void {
    const request = localStorage.getItem(this.searchKey);

    if (request) {
      this.requestData$.next(JSON.parse(request) as FlightSearchFormValue);
    }
  }

  private static handleError<T>(operation = 'operation', result?: T) {
    return (error: Error | undefined): Observable<T> => {
      console.error(operation, error);
      return of(result as T);
    };
  }

  private searchRequest(v: FlightSearchRequest): Observable<FlightSearchResponse | null> {
    const url = `${API_BASE_URL}search/flight`;
    return this.http
      .post<FlightSearchResponse>(url, v)
      .pipe(take(1), timeout(3000), catchError(SearchService.handleError('search', null)));
  }

  private static transformFormValueToReqScheme(v: FlightSearchFormValue): FlightSearchRequest {
    const { airport, dates } = v;
    const { fromLoc, toLoc } = airport;
    const { IATA: fromKey } = fromLoc;
    const { IATA: toKey } = toLoc;
    const forwardDate = dayjs.utc(dates.takeoffDate).toISOString();
    const backDate = dates.landingDate != null ? dayjs.utc(dates.landingDate).toISOString() : undefined;

    const requestData: FlightSearchRequest = {
      fromKey,
      toKey,
      forwardDate,
      backDate,
    };

    return requestData;
  }
}
