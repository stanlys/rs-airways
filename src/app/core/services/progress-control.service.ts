import { Injectable } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProgressControlService {
  public stepper!: MatStepper;

  constructor(private router: Router) {}

  public navigateToIndex(index: number): void {
    const pageNames = ['flights', 'process', 'summary'] as const;
    const path = pageNames[index];
    this.router.navigate(['booking', path]).catch(console.error);
  }
}
