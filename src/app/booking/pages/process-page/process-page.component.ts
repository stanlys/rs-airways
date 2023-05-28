import { Component, OnDestroy } from '@angular/core';
import { ITrip } from '../../interfaces/flight';
import { IContacts, PassengersFormValue } from '../../interfaces/process.interface';
import { PassengersService } from '../../services/passengers.service';
import { SummaryService } from '../../services/summary.service';

@Component({
  selector: 'app-process-page',
  templateUrl: './process-page.component.html',
  styleUrls: ['./process-page.component.scss'],
})
export class ProcessPageComponent implements OnDestroy {
  public isPassengersValid = false;

  public isContactsValid = false;

  private newPassengers!: PassengersFormValue[];

  private newContacts!: IContacts;

  private trip!: ITrip;

  constructor(private progress: PassengersService, private summary: SummaryService) {
    this.trip = summary.getSummary() as ITrip;
    console.log(this.trip);
  }

  public ngOnDestroy(): void {
    this.progress.updateData(this.newPassengers, this.newContacts);
  }

  public chechPassengers(value: boolean): void {
    this.isPassengersValid = value;
  }

  public getPassengers(value: PassengersFormValue[]): void {
    this.newPassengers = value;
    this.updateTrip();
  }

  public checkContacts(value: boolean): void {
    this.isContactsValid = value;
  }

  public getDetails(value: IContacts): void {
    this.newContacts = value;
  }

  public updateTrip(): void {
    if (!this.trip) return;

    this.trip.passengers = this.newPassengers.map((passenger) => this.progress.transformPassengerToTrip(passenger));

    console.log(this.trip);

    this.summary.setSummary(this.trip);
  }
}
