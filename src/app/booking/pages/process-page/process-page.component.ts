import { Component, OnDestroy } from '@angular/core';
import dayjs from 'dayjs';
import { ITrip } from '../../interfaces/flight';

import type { IPassenger } from '../../interfaces/passenger';
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

  private newPassengers: PassengersFormValue[] = [];

  private newContacts?: IContacts;

  private trip!: ITrip;

  constructor(private progress: PassengersService, private summary: SummaryService) {
    this.trip = summary.getSummary() as ITrip;
    console.log(this.trip);
  }

  public ngOnDestroy(): void {
    if (this.newPassengers.length && this.newContacts != null) {
      this.progress.updateData(this.newPassengers, this.newContacts);
      this.updateTrip();
    }
  }

  public checkPassengers(value: boolean): void {
    this.isPassengersValid = value;
  }

  public getPassengers(value: PassengersFormValue[]): void {
    this.newPassengers = value;
  }

  public checkContacts(value: boolean): void {
    this.isContactsValid = value;
  }

  public getDetails(value: IContacts): void {
    this.newContacts = value;
  }

  public updateTrip(): void {
    if (!this.trip) return;

    this.trip.passengers = this.newPassengers.map((passenger) =>
      ProcessPageComponent.transformPassengersFormValueToIPassenger(passenger)
    );

    console.log(this.trip);

    this.summary.setSummary(this.trip);
  }

  private static generateSeat = (): string => {
    const num = Math.ceil(Math.random() * 2 ** 6);
    const letter = 'ABC'[Math.floor(Math.random() * 3)];
    return `${num}${letter}`;
  };

  private static transformPassengersFormValueToIPassenger(passenger: PassengersFormValue): IPassenger {
    const { firstName, lastName, luggage, birthDate, type } = passenger;
    const fares = {
      Infant: 0.38,
      Child: 0.77,
      Adult: 1,
    };

    const tax = {
      Infant: 0.102,
      Child: 0.459,
      Adult: 0.355,
    };

    const summaryPassenger = {
      nameFull: `${firstName} ${lastName}`,
      age: dayjs().diff(dayjs(birthDate), 'year'),
      cabinBag: 1,
      fare: fares[type],
      luggage,
      seat: ProcessPageComponent.generateSeat(),
      tax: tax[type],
    };
    return summaryPassenger;
  }
}
