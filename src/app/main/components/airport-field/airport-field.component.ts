/* eslint-disable no-underscore-dangle */
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { Airport } from '../../model/main.interfaces';
import { AIRPORTS } from '../../model/mock-list.model';

@Component({
  selector: 'app-airport-field',
  templateUrl: './airport-field.component.html',
  styleUrls: ['./airport-field.component.scss'],
})
export class AirportFieldComponent {
  public myControl: FormControl;

  public filteredOptions: Observable<Airport[]> | undefined;

  public options = AIRPORTS;

  constructor() {
    this.myControl = new FormControl<string | Airport>('', Validators.required);
  }

  public ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        if (!value) {
          return this.options;
        }
        return this._filter(value as string);
      })
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public showAirport(airport: Airport): string {
    return airport && airport.city ? `${airport.city} ${airport.name ? airport.name : ''}, ${airport.code}` : '';
  }

  private _filter(value: string): Airport[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) => option.city.toLowerCase().includes(filterValue));
  }
}
