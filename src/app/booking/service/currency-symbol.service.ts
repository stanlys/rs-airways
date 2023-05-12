import { Injectable } from '@angular/core';
import { STORAGE_KEY_PREFIX } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class CurrencySymbolService {
  private CURRENCIES = new Map<string, string>();

  private currencyItemKey = `${STORAGE_KEY_PREFIX}-currency`;

  constructor() {
    this.CURRENCIES.set('EUR', '€').set('PLN', 'zł').set('USD', '$').set('RUB', '₽');
  }

  public getCurrencySymbol(): string {
    const selectedCurrency = localStorage.getItem(this.currencyItemKey) || 'EUR';
    return this.CURRENCIES.get(selectedCurrency) as string;
  }
}
