import { Injectable } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressControlService {
  public stepper!: MatStepper;

  public selectedIndex$ = new BehaviorSubject<number>(0);

  constructor(private router: Router) {}

  public navigateToIndex(index: number): void {
    let path = '';

    switch (index) {
      case 0:
        path = 'flights';
        break;
      case 1:
        path = 'process';
        break;
      case 2:
        path = 'summary';
        break;
      default:
        path = 'flights';
    }

    this.router.navigate(['booking', path]).catch(console.error);
  }
}
