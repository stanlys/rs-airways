import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { STORAGE_KEY_PREFIX } from '../../shared/constants';
import { IPassenger } from '../interfaces/summary-passenger';

@Injectable({
  providedIn: 'root',
})
export class PassengersService {
  private readonly passengersKey = `${STORAGE_KEY_PREFIX}-passengers`;

  private isOrdered = false;

  private all = new BehaviorSubject<IPassenger[] | null>(null);

  constructor() {
    this.init();
  }

  public get(): IPassenger[] | null {
    return this.all.value;
  }

  public set(val: IPassenger[]): void {
    this.all.next(val);
  }

  private init(): void {
    const passengers = localStorage.getItem(this.passengersKey);
    if (!passengers) return;

    this.set(JSON.parse(passengers) as IPassenger[]);
  }

  private save(): void {
    localStorage.setItem(this.passengersKey, JSON.stringify(this.all));
  }
}
