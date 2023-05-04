import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { STORAGE_KEY_PREFIX } from '../../shared/constants';
import { FlightSearchRequest } from '../models/flight-search-request.model';

const initRequest: FlightSearchRequest = {
  oneWay: false,
  airport: {
    from: {
      city: '',
      country: '',
      name: '',
      IATA: '',
    },
    to: {
      city: '',
      country: '',
      name: '',
      IATA: '',
    },
  },
  dates: {
    dateFrom: new Date(),
    dateTo: new Date(),
  },
  passengers: {
    adult: 0,
    child: 0,
    infant: 0,
  },
};

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public request = new BehaviorSubject<FlightSearchRequest>(initRequest);

  private searchKey = `${STORAGE_KEY_PREFIX}-searchRequest`;

  constructor(private router: Router) {
    this.init();
  }

  public update(value: FlightSearchRequest): void {
    this.request.next(value);
    localStorage.setItem(this.searchKey, JSON.stringify(value));
  }

  private init(): void {
    const request = localStorage.getItem(this.searchKey);

    if (request) {
      this.request.next(JSON.parse(request) as FlightSearchRequest);
    }
  }
}
