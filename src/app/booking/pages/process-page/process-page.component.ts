import { Component, OnDestroy } from '@angular/core';
import dayjs from 'dayjs';
import { TripListService } from '../../../cart/service/trip-list.service';
import { Prices } from '../../../shared/models/flight-search.interfaces';
import { PriceService } from '../../../shared/services/price.service';
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

  constructor(private progress: PassengersService, private summary: SummaryService, private tripList: TripListService) {
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

    const price = this.tripList.getTripPrice(this.trip);
    this.trip.passengers = this.newPassengers.map((passenger) =>
      ProcessPageComponent.transformPassengersFormValueToIPassenger(passenger, price)
    );

    this.summary.setSummary(this.trip);
  }

  private static generateSeat = (): string => {
    const num = Math.ceil(Math.random() * 2 ** 6);
    const letter = 'ABC'[Math.floor(Math.random() * 3)];
    return `${num}${letter}`;
  };

  private static transformPassengersFormValueToIPassenger(passenger: PassengersFormValue, price: number): IPassenger {
    const { firstName, lastName, luggage, birthDate, type } = passenger;
    const fares = {
      Infant: 0.35,
      Child: 0.41,
      Adult: 0.645,
    };

    const tax = {
      Infant: 0.04,
      Child: 0.35,
      Adult: 0.355,
    };

    const summaryPassenger = {
      nameFull: `${firstName} ${lastName}`,
      age: dayjs().diff(dayjs(birthDate), 'year'),
      cabinBag: 1,
      fare: fares[type] * price,
      luggage,
      seat: ProcessPageComponent.generateSeat(),
      tax: tax[type] * price,
    };
    return summaryPassenger;
  }
}
