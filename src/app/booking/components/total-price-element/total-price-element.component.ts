import { Component, Input } from '@angular/core';
import { CurrencySymbolService } from '../../service/currency-symbol.service';

@Component({
  selector: 'app-total-price-element',
  templateUrl: './total-price-element.component.html',
  styleUrls: ['./total-price-element.component.scss'],
})
export class TotalPriceElementComponent {
  @Input() public caption!: string;

  @Input() public fare!: number;

  @Input() public tax!: number;

  constructor(public currencyService: CurrencySymbolService) {}
}
