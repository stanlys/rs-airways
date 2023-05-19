import { Component } from '@angular/core';
import { PriceService } from '../../../../shared/services/price.service';
import { CURRENCIES } from '../../../../shared/constants';
import { CurrencyCode } from '../../../../shared/models/flight-search.interfaces';

@Component({
  selector: 'app-currency-menu',
  templateUrl: './currency-menu.component.html',
  styleUrls: ['./currency-menu.component.scss'],
})
export class CurrencyMenuComponent {
  public selectedCurrency$ = this.priceService.currencyCode$.asObservable();

  public currencies = CURRENCIES;

  constructor(private priceService: PriceService) {}

  public selectCurrency(v: CurrencyCode): void {
    this.priceService.setCurrency(v);
  }
}
