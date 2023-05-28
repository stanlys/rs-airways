import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { STORAGE_KEY_PREFIX } from '../constants';
import { CurrencyCode, Flight, Prices } from '../models/flight-search.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  public price?: number;

  public readonly initPrice = { eur: 0, usd: 0, rub: 0, pln: 0 };

  public readonly currencyItemKey = `${STORAGE_KEY_PREFIX}-currency`;

  private defaultCode = (localStorage.getItem(this.currencyItemKey) as CurrencyCode) || 'EUR';

  public currencyCode$ = new BehaviorSubject<Uppercase<keyof Prices>>(this.defaultCode);

  public setCurrency(code: CurrencyCode = this.defaultCode): void {
    this.currencyCode$.next(code);
    localStorage.setItem(this.currencyItemKey, code);
  }

  public getFlightPrice(flight: Flight, code: CurrencyCode = this.defaultCode): number | null {
    if (flight.price != null) {
      const priceKey = <keyof Prices>code.toLowerCase();
      const price = flight.price[priceKey];
      return price;
    }

    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  public sumPrice(a: Prices, b = this.initPrice, c = this.initPrice): Prices {
    return {
      eur: a.eur + b.eur + c.eur,
      usd: a.usd + b.usd + c.usd,
      rub: a.rub + b.rub + c.rub,
      pln: a.pln + b.pln + c.pln,
    };
  }

  public getPrice(prices?: Prices, code: CurrencyCode = this.currencyCode$.getValue()): number {
    if (prices != null) {
      const priceKey = <keyof Prices>code.toLowerCase();
      const price = prices[priceKey];
      return price;
    }

    return 0;
  }
}
