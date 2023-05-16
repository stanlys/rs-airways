import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Flight, Price } from '../models/flight-search.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  public price?: number;

  public currencyCode: Uppercase<keyof Price> = 'USD';

  constructor(private translate: TranslateService) {
    this.setCurrencyCode();
    translate.onLangChange.subscribe(() => this.setCurrencyCode());
  }

  private setCurrencyCode(): void {
    this.currencyCode = <Uppercase<keyof Price>>this.translate.instant('MISC.CURRENCY');
  }

  public getPrice(flight: Flight): number | null {
    if (this.currencyCode != null) {
      const priceKey = <keyof Price>this.currencyCode.toLocaleLowerCase();
      const price = flight.price[priceKey];
      return price;
    }

    return null;
  }
}
