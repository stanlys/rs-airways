import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addFlightToCart } from 'src/app/store/actions/shopping-cart.action';

import { addFlightToProfile } from 'src/app/store/actions/user-flight-history.action';
import { ProgressControlService } from '../../../core/services/progress-control.service';
import { NavigationService } from '../../../shared/services/navigation.service';
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
    public summaryService: SummaryService,
    private store: Store,
    private stepperService: ProgressControlService,
    private location: Location,
    private navigationService: NavigationService,
    private router: Router
  ) {
    this.trip = summaryService.getSummary();
  }

  public addtoCart(): void {
    if (this.trip) this.store.dispatch(addFlightToCart({ flight: this.trip }));
    if (this.stepperService.stepper.selected) this.stepperService.stepper.selected.completed = true;
  }

  public buyNow(): void {
    if (this.trip) this.store.dispatch(addFlightToProfile({ flight: this.trip }));
    if (this.stepperService.stepper.selected) this.stepperService.stepper.selected.completed = true;
    this.router.navigate(['cart']).catch(console.error);
  }

  public goBack(): void {
    if (this.navigationService.prevUrl.includes('process')) {
      this.stepperService.stepper.previous();
    }

    this.location.back();
  }
}
