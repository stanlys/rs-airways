import { Injectable } from '@angular/core';
import { IPassenger } from 'src/app/booking/interfaces/passenger';
import { IPassengerByAge } from '../interfaces';
import { ADULT_AGE, INFANT_AGE } from '../AGES';
import { TranslatePassengersService } from './translate-passengers.service';

@Injectable({
  providedIn: 'root',
})
export class PassengersListService {
  private index = 0;

  constructor(private translateService: TranslatePassengersService) {}

  public passengerByAge(passengers: IPassenger[]): IPassengerByAge {
    this.index += 1;
    let adult = 0;
    let child = 0;
    let infant = 0;
    passengers.forEach((p) => {
      if (p.age >= ADULT_AGE) {
        adult += 1;
      } else if (p.age < INFANT_AGE) {
        infant += 1;
      } else {
        child += 1;
      }
    });
    return {
      adult,
      child,
      infant,
    };
  }

  public passengersByString(passengers: IPassenger[]): string {
    const result = [];
    const passengersCount: IPassengerByAge = this.passengerByAge(passengers);
    if (passengersCount.adult > 0) result.push(this.translateService.getCaption(passengersCount.adult, 0));
    if (passengersCount.child > 0) result.push(this.translateService.getCaption(passengersCount.child, 1));
    if (passengersCount.infant > 0) result.push(this.translateService.getCaption(passengersCount.infant, 2));
    return result.join(', ');
  }
}
