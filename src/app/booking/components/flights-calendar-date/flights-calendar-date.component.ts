import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { Flight, Price } from '../../../shared/models/flight-search.interfaces';
import { PriceService } from '../../../shared/services/price.service';

@Component({
  selector: 'app-flights-calendar-date',
  templateUrl: './flights-calendar-date.component.html',
  styleUrls: ['./flights-calendar-date.component.scss'],
})
export class FlightsCalendarDateComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public date!: Date;

  @Input() public flight?: Flight;

  @Input() public selectedFlightNumber?: string;

  public selected?: boolean;

  @Input() public last!: boolean;

  @Output() public selectedChange = new EventEmitter<string>();

  public currencyCode?: Uppercase<keyof Price>;

  public price: number | null = null;

  private onLangChangeSub: Subscription;

  public locale = this.translateService.currentLang;

  constructor(private translateService: TranslateService, private priceService: PriceService) {
    this.onLangChangeSub = this.translateService.onLangChange.subscribe((e) => {
      this.setCurrencyCode();
      this.setPrice();
      this.locale = e.lang;
    });
  }

  public ngOnInit(): void {
    this.setCurrencyCode();
    this.setPrice();
  }

  public ngOnChanges(): void {
    this.selected = this.flight?.flightNumber === this.selectedFlightNumber;
  }

  public ngOnDestroy(): void {
    this.onLangChangeSub.unsubscribe();
  }

  public select(): void {
    if (this.flight != null) {
      this.selectedChange.emit(this.flight.flightNumber);
    }
  }

  private setCurrencyCode(): void {
    this.currencyCode = this.priceService.currencyCode;
  }

  private setPrice(): void {
    if (this.flight != null) {
      this.price = this.priceService.getPrice(this.flight);
    }
  }
}
