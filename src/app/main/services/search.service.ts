import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, of, timeout } from 'rxjs';

import { API_BASE_URL, STORAGE_KEY_PREFIX } from '../../shared/constants';
import { FlightSearchFormValue, FlightSearchRequest, FlightSearchResponse } from '../models/flight-search.model';
import { defaultFlights } from '../mock-flights-response';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public requestData$ = new Subject<FlightSearchFormValue>();

  public flights$ = new BehaviorSubject<FlightSearchResponse>(defaultFlights);

  private readonly searchKey = `${STORAGE_KEY_PREFIX}-searchRequest`;

  constructor(private http: HttpClient) {
    this.init();
  }

  public update(v: FlightSearchFormValue): void {
    this.requestData$.next(v);
    localStorage.setItem(this.searchKey, JSON.stringify(v));

    const reqData = SearchService.transformFormValueToReqScheme(v);

    this.search(reqData).subscribe((res) => {
      console.log(res);

      if (res != null) {
        this.flights$.next(res);
      }
    });
  }

  private init(): void {
    const request = localStorage.getItem(this.searchKey);

    if (request) {
      this.requestData$ = new BehaviorSubject(JSON.parse(request) as FlightSearchFormValue);
    }
  }

  private static handleError<T>(operation = 'operation', result?: T) {
    return (error: Error | undefined): Observable<T> => {
      console.error(operation, error);
      return of(result as T);
    };
  }

  private search(v: FlightSearchRequest): Observable<FlightSearchResponse | null> {
    const url = `${API_BASE_URL}search/flight`;
    return this.http
      .post<FlightSearchResponse>(url, v)
      .pipe(timeout(3000), catchError(SearchService.handleError('search', null)));
  }

  private static transformFormValueToReqScheme(v: FlightSearchFormValue): FlightSearchRequest {
    const { airport, dates } = v;
    const { from, to } = airport;
    const { IATA: fromKey } = from;
    const { IATA: toKey } = to;
    const forwardDate = dates.from.toISOString();
    const backDate = dates.to?.toISOString();

    const requestData: FlightSearchRequest = {
      fromKey,
      toKey,
      forwardDate,
      backDate,
    };

    return requestData;
  }
}
