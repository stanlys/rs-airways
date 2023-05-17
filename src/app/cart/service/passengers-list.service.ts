import { Injectable } from '@angular/core';
import { IPassenger } from 'src/app/booking/interface/passenger';
import { IPassengerByAge } from '../interfaces';
import { ADULT_AGE, INFANT_AGE } from '../AGES';

@Injectable({
  providedIn: 'root',
})
export class PassengersListService {
  private index = 0;

  public passengerByAge(passengers: IPassenger[]): IPassengerByAge {
    this.index += 1;
    let adult = 0;
    let child = 0;
    let infant = 0;
    passengers.forEach((p) => {
      if (p.age >= ADULT_AGE) {
        adult += 1;
      } else if (p.age <= INFANT_AGE) {
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
    let passengersCount: IPassengerByAge = this.passengerByAge(passengers);
    if (passengersCount.adult > 0) result.push(`${passengersCount.adult} x Adult`);
    if (passengersCount.child > 0) result.push(`${passengersCount.child} x Child`);
    if (passengersCount.infant > 0) result.push(`${passengersCount.infant} x Infant`);
    return result.join(', ');
  }
}
