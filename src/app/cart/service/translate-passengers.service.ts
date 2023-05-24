import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ISummaryLang } from 'src/app/booking/interfaces/flight';

@Injectable({
  providedIn: 'root',
})
export class TranslatePassengersService {
  constructor(private translate: TranslateService) {}

  public getCaption(count: number, index: number): string {
    let res = ['', '', ''];
    this.translate.get('SUMMARY').subscribe((el: ISummaryLang) => {
      res = [el['ADULT'], el['CHILD'], el['INFANT']];
    });
    return `${count} x ${res[index]}`;
  }
}
