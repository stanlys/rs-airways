import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressControlService } from '../../../core/services/progress-control.service';

@Component({
  selector: 'app-progress-controls',
  templateUrl: './progress-controls.component.html',
  styleUrls: ['./progress-controls.component.scss'],
})
export class ProgressControlsComponent {
  @Input() public canContinue = false;

  constructor(private controlService: ProgressControlService, private router: Router) {}

  public back(): void {
    const { selectedIndex } = this.controlService.stepper;

    this.controlService.stepper.previous();

    if (selectedIndex === 0) {
      this.router.navigate(['/main']).catch(console.error);
    }
  }

  public forward(): void {
    this.controlService.stepper.next();
  }
}
