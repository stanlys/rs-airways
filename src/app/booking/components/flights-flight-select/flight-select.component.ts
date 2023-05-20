import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

import { CurrencyCode, Flight } from '../../../shared/models/flight-search.interfaces';
import { PriceService } from '../../../shared/services/price.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-flight-select',
  templateUrl: './flight-select.component.html',
  styleUrls: ['./flight-select.component.scss'],
})
export class FlightSelectComponent implements OnChanges, OnDestroy {
  @Input() public flight!: Flight;

  @Input() public confirmed!: boolean;

  @Output() public confirmedChange = new EventEmitter<boolean>();

  public currencyCode$;

  public price: number | null = null;

  public locale = this.translateService.currentLang;

  private destroy$ = new Subject<void>();

  @Input() public isFirstFlight = false;

  constructor(
    private translateService: TranslateService,
    private priceService: PriceService,
    private bookingService: BookingService
  ) {
    this.currencyCode$ = this.priceService.currencyCode$;

    this.priceService.currencyCode$.pipe(takeUntil(this.destroy$)).subscribe((code) => {
      this.setPrice(code);
    });

    this.translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((e) => {
      this.setPrice();
      this.locale = e.lang;
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { flight } = changes;

    if (this.isFirstFlight && this.flight != null) {
      this.bookingService.minutesOffset = this.flight.timeMins;
    }

    if (flight != null) {
      this.setPrice();

      const previousValue = flight.previousValue as Flight;
      const currentValue = flight.currentValue as Flight;
      const { firstChange } = flight;

      if (!firstChange && currentValue.price.usd !== previousValue.price.usd) {
        this.setPrice();
      }
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onClick(): void {
    this.confirmedChange.emit(!this.confirmed);
  }

  private setPrice(code?: CurrencyCode): void {
    if (this.flight != null) {
      this.price = this.priceService.getPrice(this.flight, code);
    }
  }
}
