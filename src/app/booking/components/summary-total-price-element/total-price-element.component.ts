import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PriceService } from '../../../shared/services/price.service';
import { CurrencySymbolService } from '../../services/currency-symbol.service';

@Component({
  selector: 'app-total-price-element',
  templateUrl: './total-price-element.component.html',
  styleUrls: ['./total-price-element.component.scss'],
})
export class TotalPriceElementComponent {
  @Input() public caption!: string;

  @Input() public fare!: number;

  @Input() public tax!: number;

  public currencyCode$;

  public locale = this.translateService.currentLang;

  constructor(
    public currencyService: CurrencySymbolService,
    private priceService: PriceService,
    private translateService: TranslateService
  ) {
    this.currencyCode$ = this.priceService.currencyCode$;
  }
}
