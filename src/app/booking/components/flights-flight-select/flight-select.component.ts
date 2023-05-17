import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { Flight, Price } from '../../../shared/models/flight-search.interfaces';
import { PriceService } from '../../../shared/services/price.service';

@Component({
  selector: 'app-flight-select',
  templateUrl: './flight-select.component.html',
  styleUrls: ['./flight-select.component.scss'],
})
export class FlightSelectComponent implements OnChanges, OnDestroy {
  @Input() public flight!: Flight;

  @Input() public confirmed!: boolean;

  @Output() public confirmedChange = new EventEmitter<boolean>();

  public currencyCode?: Uppercase<keyof Price>;

  public price: number | null = null;

  private onLangChangeSub: Subscription;

  constructor(private translate: TranslateService, private priceService: PriceService) {
    this.onLangChangeSub = this.translate.onLangChange.subscribe(() => this.setPrice());
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { flight } = changes;

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
    this.onLangChangeSub.unsubscribe();
  }

  public onClick(): void {
    this.confirmedChange.emit(!this.confirmed);
  }

  private setPrice(): void {
    this.currencyCode = this.priceService.currencyCode;

    if (this.flight != null) {
      this.price = this.priceService.getPrice(this.flight);
    }
  }
}
