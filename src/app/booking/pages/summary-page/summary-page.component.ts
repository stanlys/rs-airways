import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { SUMMART_FLIGHT, SUMMARY_PASSENGER_TEST } from './MOCK_DATA_summary_page';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent {
  public passengers = SUMMARY_PASSENGER_TEST;

  public flights = SUMMART_FLIGHT;

  constructor(private store: Store, public router: ActivatedRoute) {
    this.router.queryParamMap.subscribe((a) => console.log(a));
  }

  public addtoCart(): void {
    // добавление в store
    console.log('Add to cart ', this.flights);
  }

  public buyNow(): void {
    // добавление в store
    console.log('Buy now ', this.flights);
  }
}
