import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { STORAGE_KEY_PREFIX } from '../constants';
import { CurrencyCode, Flight, Price } from '../models/flight-search.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  public price?: number;

  public readonly currencyItemKey = `${STORAGE_KEY_PREFIX}-currency`;

  private defaultCode = (localStorage.getItem(this.currencyItemKey) as CurrencyCode) || 'EUR';

  public currencyCode$ = new BehaviorSubject<Uppercase<keyof Price>>(this.defaultCode);

  public setCurrency(code: CurrencyCode = this.defaultCode): void {
    this.currencyCode$.next(code);
    localStorage.setItem(this.currencyItemKey, code);
  }

  public getPrice(flight: Flight, code: CurrencyCode = this.defaultCode): number | null {
    if (flight.price != null) {
      const priceKey = <keyof Price>code.toLowerCase();
      const price = flight.price[priceKey];
      return price;
    }

    return null;
  }
}
