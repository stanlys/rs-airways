import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { ProgressControlService } from '../../../core/services/progress-control.service';
import { ITrip } from '../../interfaces/flight';
import { SummaryService } from '../../services/summary.service';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent {
  public trip?: ITrip;

  constructor(
    private store: Store,
    public summaryService: SummaryService,
    private controlService: ProgressControlService
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.trip = summaryService.getSummary();
  }

  public addtoCart(): void {
    // TODO: добавление в store
    console.log('Add to cart ', this.trip);
  }

  public buyNow(): void {
    // добавление в store
    console.log('Buy now ', this.trip);
  }

  public goBack(): void {
    this.controlService.stepper.previous();
  }
}
