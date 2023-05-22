import { Component } from '@angular/core';
import { PassengersService } from '../../services/passengers.service';

@Component({
  selector: 'app-process-page',
  templateUrl: './process-page.component.html',
  styleUrls: ['./process-page.component.scss'],
})
export class ProcessPageComponent {
  public isPassengersValid = false;

  public isContactsValid = false;

  constructor(private passengers: PassengersService) {}

  public onSubmit(): void {
    this.passengers.get();
  }

  public chechPassengers(value: boolean): void {
    this.isPassengersValid = value;
  }

  public checkContacts(value: boolean): void {
    this.isContactsValid = value;
  }
}
