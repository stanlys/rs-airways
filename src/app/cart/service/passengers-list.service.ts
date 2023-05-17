import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IPassenger } from 'src/app/booking/interface/passenger';
import { IPassengerByAge } from '../interfaces';
import { ADULT_AGE, INFANT_AGE } from '../AGES';

@Injectable({
  providedIn: 'root',
})
export class PassengersListService {
  private index = 0;

  constructor(private translate: TranslateService) {}

  public passengerByAge(passengers: IPassenger[]): IPassengerByAge {
    this.index += 1;
    const res: IPassengerByAge = { adult: 0, child: 0, infant: 0 };
    passengers.forEach((p) => {
      if (p.age >= ADULT_AGE) {
        res.adult += 1;
      } else if (p.age <= INFANT_AGE) {
        res.adult += 1;
      } else {
        res.adult += 1;
      }
    });
    return res;
  }
}
