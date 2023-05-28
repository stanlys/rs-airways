import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Prices } from '../../../shared/models/flight-search.interfaces';
import { PriceService } from '../../../shared/services/price.service';
import { CurrencySymbolService } from '../../services/currency-symbol.service';

@Component({
  selector: 'app-total-price-element',
  templateUrl: './total-price-element.component.html',
  styleUrls: ['./total-price-element.component.scss'],
})
export class TotalPriceElementComponent {
  @Input() public caption!: string;

  @Input() public fare!: Prices;

  @Input() public tax!: Prices;

  public currencyCode$;

  public locale = this.translateService.currentLang;

  public passengersFare = this.priceService.getPrice(this.fare);

  public passengersTax = this.priceService.getPrice(this.tax);

  constructor(
    public currencyService: CurrencySymbolService,
    private priceService: PriceService,
    private translateService: TranslateService
  ) {
    this.currencyCode$ = this.priceService.currencyCode$;
  }

  public ngOnInit(): void {
    this.priceService.currencyCode$.pipe().subscribe((code) => {
      this.passengersFare = this.priceService.getPrice(this.fare, code);
      this.passengersTax = this.priceService.getPrice(this.tax, code);
    });
  }
}
