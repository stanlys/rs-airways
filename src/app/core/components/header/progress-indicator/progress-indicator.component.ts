import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

import { ProgressControlService } from '../../../services/progress-control.service';

@Component({
  selector: 'app-progress-indicator',
  templateUrl: './progress-indicator.component.html',
  styleUrls: ['./progress-indicator.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class ProgressIndicatorComponent implements AfterViewInit {
  @ViewChild('stepper') private stepperRef!: MatStepper;

  constructor(private controlService: ProgressControlService) {}

  public ngAfterViewInit(): void {
    this.controlService.stepper = this.stepperRef;
    this.stepperRef.selectionChange.subscribe((selection) => {
      this.controlService.navigateToIndex(selection.selectedIndex);
    });
  }
}
