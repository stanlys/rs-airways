import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { STORAGE_KEY_PREFIX } from '../../shared/constants';
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
}
