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
    const paths = ['flights', 'process', 'summary'];
    this.router.navigate(['booking', paths[index]]).catch(console.error);
  }
}
