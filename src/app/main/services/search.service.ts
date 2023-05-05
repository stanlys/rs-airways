import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, of, timeout } from 'rxjs';

import { API_BASE_URL, STORAGE_KEY_PREFIX } from '../../shared/constants';
import { FlightSearchRequest, FlightSearchResponse } from '../models/flight-search.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public requestData$ = new Subject<FlightSearchRequest>();

  public flights$ = new Subject<FlightSearchResponse>();

  private readonly searchKey = `${STORAGE_KEY_PREFIX}-searchRequest`;

  constructor(private http: HttpClient) {
    this.init();
  }

  public update(v: FlightSearchRequest): void {
    this.requestData$.next(v);

    localStorage.setItem(this.searchKey, JSON.stringify(v));

    this.search(v).subscribe((res) => {
      console.log(res);

      if (res != null) {
        this.flights$.next(res);
      }
    });
  }

  private init(): void {
    const request = localStorage.getItem(this.searchKey);

    if (request) {
      this.requestData$ = new BehaviorSubject(JSON.parse(request) as FlightSearchRequest);
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
}
