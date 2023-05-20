// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, Subject, catchError, of, timeout, BehaviorSubject } from 'rxjs';

// import { API_BASE_URL, STORAGE_KEY_PREFIX } from '../../shared/constants';
// import {
//   FlightSearchFormValue,
//   FlightSearchResponse,
//   FlightSearchRequest,
// } from '../../shared/models/flight-search.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class SearchService {
//   public requestData$ = new BehaviorSubject<FlightSearchFormValue | null>(null);

//   public flights = new Subject<FlightSearchResponse>();

//   private readonly searchKey = `${STORAGE_KEY_PREFIX}-searchRequest`;

//   constructor(private http: HttpClient) {
//     this.init();
//   }

//   // public update(v: FlightSearchFormValue): void {
//   //   this.requestData$.next(v);

//   //   localStorage.setItem(this.searchKey, JSON.stringify(v));

//   //   this.search(v).subscribe((res) => {
//   //     console.log(res);
//   //     if (res != null) {
//   //       this.flights.next(res);
//   //     }
//   //   });
//   // }

//   public update(v: FlightSearchFormValue): void {
//     this.requestData$.next(v);
//     localStorage.setItem(this.searchKey, JSON.stringify(v));

//     // const data = SearchService.transformFormValueToReqScheme(v);

//     // this.searchRequest(data).subscribe((res) => {
//     //   if (res != null) {
//     //     this.flights$.next(res);
//     //   }
//     // });
//   }

//   private init(): void {
//     const request = localStorage.getItem(this.searchKey);

//     if (request) {
//       this.requestData$.next(JSON.parse(request) as FlightSearchFormValue);
//     }
//   }

//   private static handleError<T>(operation = 'operation', result?: T) {
//     return (error: Error | undefined): Observable<T> => {
//       console.error(operation, error);
//       return of(result as T);
//     };
//   }

//   private search(v: FlightSearchRequest): Observable<FlightSearchFormValue | null> {
//     const url = `${API_BASE_URL}search/flight`;
//     return this.http
//       .post<FlightSearchFormValue>(url, v)
//       .pipe(timeout(3000), catchError(SearchService.handleError('search', null)));
//   }
// }
