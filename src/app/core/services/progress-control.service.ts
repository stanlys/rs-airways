import { Injectable } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressControlService {
  public stepper!: MatStepper;

  public selectedIndex$ = new BehaviorSubject<number>(0);
}
