import { TranslateService } from '@ngx-translate/core';
import { Component, Input, OnInit } from '@angular/core';
import { SummaryService } from '../../services/summary.service';
import { CurrencySymbolService } from '../../services/currency-symbol.service';
import { ISummaryFare, ISummaryLang, ISummaryTrip, ITrip } from '../../interfaces/flight';
import { IPassenger } from '../../interfaces/passenger';
import { PriceService } from '../../../shared/services/price.service';
import { CurrencyCode, Prices } from '../../../shared/models/flight-search.interfaces';

@Component({
  selector: 'app-total-price',
  templateUrl: './total-price.component.html',
  styleUrls: ['./total-price.component.scss'],
})
export class TotalPriceComponent implements OnInit {
  @Input() public trip!: ITrip;

  public summaryByAge?: Array<ISummaryFare>;

  public totalPrice = 0;

  public currencyCode$;

  public locale = this.translate.currentLang;

  constructor(
    public summaryService: SummaryService,
    public currencyService: CurrencySymbolService,
    private translate: TranslateService,
    private priceService: PriceService
  ) {
    this.currencyCode$ = priceService.currencyCode$;
  }

  public ngOnInit(): void {
    this.summaryByAge = this.summaryService.getSummaryByAge(this.trip.passengers);
  }

  public getCaption(count: number, index: number): string {
    let res = ['', '', ''];
    this.translate.get('SUMMARY').subscribe((el: ISummaryLang) => {
      res = [el['ADULT'], el['CHILD'], el['INFANT']];
    });
    return `${count} x ${res[index]}`;
  }

  public getTotalPrice(code: CurrencyCode = this.currencyCode$.getValue()): number | null {
    const totalSum =
      this.summaryByAge?.reduce(
        (_sum, el) => this.priceService.sumPrice(_sum, el.fare, el.tax),
        this.priceService.initPrice
      ) || this.priceService.initPrice;
    return this.priceService.getPrice(totalSum, code);
  }
}
