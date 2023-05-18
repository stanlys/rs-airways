import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flightTime',
})
export class FlightTimePipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  public transform(value: number, locale = 'en'): null | string {
    if (value == null) {
      return null;
    }

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    if (locale === 'pl') {
      return `${hours}g ${minutes}m`;
    }

    if (locale === 'de') {
      return `${hours}s ${minutes}m`;
    }

    if (locale === 'ru') {
      return `${hours}ч ${minutes}м`;
    }

    return `${hours}h ${minutes}m`;
  }
}
