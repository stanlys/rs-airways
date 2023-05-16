import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProgressControlService } from '../../../core/services/progress-control.service';
import { SUMMART_FLIGHT, SUMMARY_PASSENGER_TEST } from './MOCK_DATA_summary_page';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent {
  public passengers = SUMMARY_PASSENGER_TEST;

  public flights = SUMMART_FLIGHT;

  constructor(private store: Store, private controlService: ProgressControlService) {}

  public addtoCart(): void {
    // TODO: добавление в store
    console.log('Add to cart ', this.flights);
  }

  public buyNow(): void {
    // TODO: добавление в store
    console.log('Buy now ', this.flights);
  }

  public goBack(): void {
    this.controlService.stepper.previous();
  }
}
