import { Component, OnDestroy } from '@angular/core';
import dayjs from 'dayjs';

import type { IPassenger } from '../../interfaces/passenger';
import { IContacts, PassengersFormValue } from '../../interfaces/process.interface';
import { ProgressService } from '../../services/progress.service';
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

  constructor(private progress: ProgressService, private summaryService: SummaryService) {}

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

  private updateTrip(): void {
    const trip = this.summaryService.getSummary();

    if (trip) {
      const { from } = trip;

      from.passengers = this.newPassengers.map((passenger) =>
        ProcessPageComponent.transformPassengersFormValueToIPassenger(passenger)
      );
    }

    if (trip?.to) {
      const { to } = trip;

      to.passengers = this.newPassengers.map((passenger) =>
        ProcessPageComponent.transformPassengersFormValueToIPassenger(passenger)
      );
    }
  }

  private static generateSeat = (): string => {
    const num = Math.ceil(Math.random() * 2 ** 6);
    const letter = 'ABC'[Math.floor(Math.random() * 3)];
    return `${num}${letter}`;
  };

  private static generateCabinBag = (): number => Math.ceil(Math.random() * 2 ** 6);

  private static transformPassengersFormValueToIPassenger(passenger: PassengersFormValue): IPassenger {
    const { firstName, lastName, luggage, birthDate, type } = passenger;
    const fares = {
      Infant: 5,
      Child: 10,
      Adult: 20,
    };
    const summaryPassenger = {
      nameFull: `${firstName} ${lastName}`,
      age: dayjs().diff(dayjs(birthDate), 'year'),
      cabinBag: ProcessPageComponent.generateCabinBag(),
      fare: fares[type],
      luggage,
      seat: ProcessPageComponent.generateSeat(),
      tax: 12.2,
    };
    return summaryPassenger;
  }
}
