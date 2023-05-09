import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, take, timeout } from 'rxjs';

import { defaultFlights } from '../../main/mock-flights-response';
import { API_BASE_URL, STORAGE_KEY_PREFIX } from '../constants';
import {
  FlightSearchFormValue,
  FlightSearchResponse,
  FlightSearchRequest,
} from '../../main/models/flight-search.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // TODO: declare search form model instead of requestData$ Subject or use ngrx store
  public requestData$ = new BehaviorSubject<FlightSearchFormValue | null>(null);

  public flights$ = new BehaviorSubject<FlightSearchResponse>(defaultFlights);

  private readonly searchKey = `${STORAGE_KEY_PREFIX}-searchRequest`;

  constructor(private http: HttpClient) {
    this.init();
  }

  public update(v: FlightSearchFormValue): void {
    this.requestData$.next(v);
    localStorage.setItem(this.searchKey, JSON.stringify(v));

    const data = SearchService.transformFormValueToReqScheme(v);

    this.searchRequest(data).subscribe((res) => {
      if (res != null) {
        this.flights$.next(res);
      }
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
    const forwardDate = dates.fromDate.toISOString();
    const backDate = dates.toDate?.toISOString();

    const requestData: FlightSearchRequest = {
      fromKey,
      toKey,
      forwardDate,
      backDate,
    };

    return requestData;
  }
}
