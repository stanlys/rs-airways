import { Component } from '@angular/core';

import { STORAGE_KEY_PREFIX } from '../../../shared/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public readonly dateFormats = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/DD/MM', 'YYYY/MM/DD'];

  public dateFormatItemKey = `${STORAGE_KEY_PREFIX}-dateFormat`;

  public selectedDateFormat = localStorage.getItem(this.dateFormatItemKey) || this.dateFormats[0];

  public readonly currencies = ['EUR', 'USD', 'RUB', 'PLN'];

  public currencyItemKey = `${STORAGE_KEY_PREFIX}-currency`;

  public selectedCurrency = localStorage.getItem(this.currencyItemKey) || this.currencies[0];

  // TODO: implement auth
  // public showAuth(): void {}

  public selectCurrency(v: string): void {
    this.selectedCurrency = v;
    localStorage.setItem(this.currencyItemKey, this.selectedCurrency);
  }

  public selectDateFormat(v: string): void {
    this.selectedDateFormat = v;
    localStorage.setItem(this.dateFormatItemKey, this.selectedDateFormat);
  }
}
