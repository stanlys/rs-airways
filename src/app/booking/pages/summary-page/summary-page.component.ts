import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { SUMMART_FLIGHT, SUMMARY_PASSENGER_TEST } from './MOCK_DATA_summary_page';
import { IPassenger } from '../../interface/passenger';
import { SummaryService } from '../../service/summary.service';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent {
  // @Input() public passengers = SUMMARY_PASSENGER_TEST;

  public flights = SUMMART_FLIGHT;

  constructor(private store: Store, public summaryService: SummaryService) {
    const summary = summaryService.getSummary();

    // if (summary) this.passengers = summary.passengers;
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
