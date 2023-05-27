import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

import { CurrencyCode, Flight } from '../../../shared/models/flight-search.interfaces';
import { PriceService } from '../../../shared/services/price.service';

@Component({
  selector: 'app-flights-calendar-date',
  templateUrl: './flights-calendar-date.component.html',
  styleUrls: ['./flights-calendar-date.component.scss'],
})
export class FlightsCalendarDateComponent implements OnChanges, OnDestroy {
  @Input() public date!: Date;

  @Input() public flight?: Flight;

  @Input() public selectedFlightNumber?: string;

  public selected?: boolean;

  @Input() public last!: boolean;

  @Output() public selectedChange = new EventEmitter<string>();

  public currencyCode$;

  public price: number | null = null;

  public locale = this.translateService.currentLang;

  private destroy$ = new Subject<void>();

  constructor(private translateService: TranslateService, private priceService: PriceService) {
    this.currencyCode$ = this.priceService.currencyCode$;

    this.priceService.currencyCode$.pipe(takeUntil(this.destroy$)).subscribe((code) => {
      this.setPrice(code);
    });

    this.translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((e) => {
      this.locale = e.lang;
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedFlightNumber']) {
      this.selected = this.flight?.flightNumber === this.selectedFlightNumber;
    }

    if (changes['flight']) {
      this.setPrice();
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public select(): void {
    if (this.flight != null) {
      this.selectedChange.emit(this.flight.flightNumber);
    }
  }

  private setPrice(code?: CurrencyCode): void {
    if (this.flight != null) {
      this.price = this.priceService.getFlightPrice(this.flight, code);
    }
  }
}
