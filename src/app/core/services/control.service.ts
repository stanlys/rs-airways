import { Injectable } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Injectable({
  providedIn: 'root',
})
export class ControlService {
  public stepper!: MatStepper;
}
