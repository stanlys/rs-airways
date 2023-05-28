import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addFlightToCart } from 'src/app/store/actions/shopping-cart.action';

import { ProgressControlService } from '../../../core/services/progress-control.service';
import { NavigationService } from '../../../shared/services/navigation.service';
import { ITrip } from '../../interfaces/flight';
import { PassengersService } from '../../services/passengers.service';
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
    private router: Router,
    private passengers: PassengersService
  ) {
    this.trip = summaryService.getSummary();
  }

  public addtoCart(): void {
    if (this.trip) this.store.dispatch(addFlightToCart({ flight: this.trip }));
    // this.passengers.deletePassengers();
    // this.passengers.deleteContacts();
  }

  public buyNow(): void {
    if (this.trip) this.store.dispatch(addFlightToCart({ flight: this.trip }));
    // this.passengers.deletePassengers();
    // this.passengers.deleteContacts();
    this.router.navigate(['cart']).catch(console.error);
  }

  public goBack(): void {
    if (this.navigationService.prevUrl.includes('process')) {
      this.stepperService.stepper.previous();
    }

    this.location.back();
  }
}
