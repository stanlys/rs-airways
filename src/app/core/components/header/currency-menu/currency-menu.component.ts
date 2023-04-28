import { Component } from '@angular/core';
import { STORAGE_KEY_PREFIX } from '../../../../shared/constants';

@Component({
  selector: 'app-currency-menu',
  templateUrl: './currency-menu.component.html',
  styleUrls: ['./currency-menu.component.scss'],
})
export class CurrencyMenuComponent {
  public readonly currencies = ['EUR', 'USD', 'RUB', 'PLN'];

  public currencyItemKey = `${STORAGE_KEY_PREFIX}-currency`;

  public selectedCurrency = localStorage.getItem(this.currencyItemKey) || this.currencies[0];

  public selectCurrency(v: string): void {
    this.selectedCurrency = v;
    localStorage.setItem(this.currencyItemKey, this.selectedCurrency);
  }
}
