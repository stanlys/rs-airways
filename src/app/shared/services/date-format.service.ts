import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { STORAGE_KEY_PREFIX } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class DateFormatService {
  public readonly dateOpts = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/DD/MM', 'YYYY/MM/DD'];

  public dateFormatItemKey = `${STORAGE_KEY_PREFIX}-dateFormat`;

  public dateFormat$ = new BehaviorSubject<string>(this.getDateFormat());

  public getDateFormat(): string {
    return localStorage.getItem(this.dateFormatItemKey) || this.dateOpts[0];
  }

  public setDateFormat(v: string): void {
    this.dateFormat$.next(v);
    localStorage.setItem(this.dateFormatItemKey, v);
  }
}
