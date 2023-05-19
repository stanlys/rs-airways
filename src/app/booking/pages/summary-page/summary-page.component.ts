import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { SUMMART_TRIP } from './MOCK_DATA_summary_page';
import { SummaryService } from '../../service/summary.service';
import { ITrip } from '../../interface/flight';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent {
  public trip?: ITrip;

  constructor(private store: Store, public summaryService: SummaryService) {
    this.trip = summaryService.getSummary();
  }

  public addtoCart(): void {
    // добавление в store
    console.log('Add to cart ', this.trip);
  }

  public buyNow(): void {
    // добавление в store
    console.log('Buy now ', this.trip);
  }
}
