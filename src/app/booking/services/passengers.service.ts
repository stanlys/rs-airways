import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { STORAGE_KEY_PREFIX } from '../../shared/constants';
import { IPassenger } from '../interfaces/passenger';
import { IContacts, PassengersFormValue } from '../interfaces/process.interface';

@Injectable({
  providedIn: 'root',
})
export class PassengersService {
  private readonly passengersKey = `${STORAGE_KEY_PREFIX}-passengers`;

  private readonly contactsKey = `${STORAGE_KEY_PREFIX}-contacts`;

  private isOrdered = false;

  public passengers$ = new BehaviorSubject<PassengersFormValue[] | null>(null);

  public contacts$ = new BehaviorSubject<IContacts | null>(null);

  constructor() {
    this.getDataFromStorage();
  }

  private getDataFromStorage(): void {
    const passengers = localStorage.getItem(this.passengersKey);

    if (passengers) {
      this.passengers$.next(JSON.parse(passengers) as PassengersFormValue[]);
    }

    const contacts = localStorage.getItem(this.contactsKey);

    if (contacts) {
      this.contacts$.next(JSON.parse(contacts) as IContacts);
    }
  }

  public updateData(passengers: PassengersFormValue[], contacts: IContacts): void {
    this.passengers$.next(passengers);
    localStorage.setItem(this.passengersKey, JSON.stringify(passengers));

    this.contacts$.next(contacts);
    localStorage.setItem(this.contactsKey, JSON.stringify(contacts));
  }

  public deletePassengers(): void {
    localStorage.removeItem(this.passengersKey);
  }

  public deleteContacts(): void {
    localStorage.removeItem(this.contactsKey);
  }

  // eslint-disable-next-line class-methods-use-this
  public transformPassengerToTrip(passenger: PassengersFormValue): IPassenger {
    const { firstName, lastName, birthDate, luggage } = passenger;
    const today = new Date();
    const birthdate = new Date(birthDate);

    // console.log(passenger);

    // console.log(birthdate, birthDate.getFullYear());

    const dY = today.getFullYear() - birthdate.getFullYear();
    const dM = today.getMonth() - birthdate.getMonth();
    const dD = today.getDate() - birthdate.getDate();

    let age = dY;
    if (dM > 0) {
      age += 1;
    } else if (dM === 0) {
      age = dD >= 0 ? age + 1 : 0;
    }

    return {
      nameFull: `${firstName} ${lastName}`.toUpperCase(),
      age,
      luggage,
      cabinBag: 1,
      seat: '5A',
      fare: 1,
      tax: 0,
    };
  }
}
