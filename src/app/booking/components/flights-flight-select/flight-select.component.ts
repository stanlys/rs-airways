import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { Flight, Price } from '../../../shared/models/flight-search.interfaces';
import { PriceService } from '../../../shared/services/price.service';

@Component({
  selector: 'app-flight-select',
  templateUrl: './flight-select.component.html',
  styleUrls: ['./flight-select.component.scss'],
})
export class FlightSelectComponent implements OnInit, OnDestroy {
  @Input() public flight!: Flight;

  @Input() public confirmed!: boolean;

  @Output() public confirmedChange = new EventEmitter<boolean>();

  public currencyCode?: Uppercase<keyof Price>;

  public price: number | null = null;

  private onLangChangeSub: Subscription;

  constructor(private translate: TranslateService, private priceService: PriceService) {
    this.onLangChangeSub = this.translate.onLangChange.subscribe(() => this.setPrice());
  }

  public ngOnInit(): void {
    this.setPrice();
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
