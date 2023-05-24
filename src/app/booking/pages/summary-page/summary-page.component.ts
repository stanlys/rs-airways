import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addFlightToCart } from 'src/app/store/actions/shopping-cart.action';

import { Router } from '@angular/router';
import { addFlightToProfile } from 'src/app/store/actions/user-flight-history.action';
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
    private controlService: ProgressControlService,
    private router: Router
  ) {
    this.trip = summaryService.getSummary();
  }

  public addtoCart(): void {
    if (this.trip) this.store.dispatch(addFlightToCart({ flight: this.trip }));
  }

  public buyNow(): void {
    if (this.trip) this.store.dispatch(addFlightToProfile({ flight: this.trip }));
  }

  public goBack(): void {
    this.controlService.stepper.previous();
    // this.router.navigate(['/profile']).finally(() => {});
  }
}
