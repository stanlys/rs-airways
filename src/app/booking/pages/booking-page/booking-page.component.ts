import { Component } from '@angular/core';

import { ControlService } from '../../../core/services/control.service';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss'],
})
export class BookingPageComponent {
  constructor(private controlService: ControlService) {}

  public back(): void {
    this.controlService.stepper.previous();
  }

  public forward(): void {
    this.controlService.stepper.next();
  }

  public reset(): void {
    this.controlService.stepper.reset();
  }
}
