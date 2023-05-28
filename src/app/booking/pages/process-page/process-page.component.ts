import { Component, OnDestroy } from '@angular/core';
import { ITrip } from '../../interfaces/flight';
import dayjs from 'dayjs';

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

  constructor(private progress: PassengersService, private summary: SummaryService, private summaryService: SummaryService) {
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

    this.trip.passengers = this.newPassengers.map((passenger) => this.progress.transformPassengerToTrip(passenger));

    console.log(this.trip);

    this.summary.setSummary(this.trip);
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
    const { firstName, lastName, luggage, birthdate, type } = passenger;
    const fares = {
      Infant: 5,
      Child: 10,
      Adult: 20,
    };
    const summaryPassenger = {
      nameFull: `${firstName} ${lastName}`,
      age: dayjs().diff(dayjs(birthdate), 'year'),
      cabinBag: ProcessPageComponent.generateCabinBag(),
      fare: fares[type],
      luggage,
      seat: ProcessPageComponent.generateSeat(),
      tax: 12.2,
    };
    return summaryPassenger;
  }
}
