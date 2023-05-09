import { Component } from '@angular/core';

import { ControlService } from '../../../core/services/control.service';
import { SearchService } from '../../../shared/services/search.service';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss'],
})
export class BookingPageComponent {
  public flights$;

  public showSearchForm = true;

  constructor(private controlService: ControlService, searchService: SearchService) {
    this.flights$ = searchService.flights$.asObservable();
  }

  public back(): void {
    this.controlService.stepper.previous();
  }

  public forward(): void {
    this.controlService.stepper.next();
  }
}
