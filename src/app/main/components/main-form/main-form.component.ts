/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Airport } from '../../model/main.interfaces';
import { AIRPORTS } from '../../model/mock-list.model';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
})
export class MainFormComponent implements OnInit {
  public searchForm: FormBuilder;

  public myControl: FormControl;

  public filteredOptions: Observable<Airport[]> | undefined;

  public options = AIRPORTS;

  constructor() {
    this.searchForm = new FormBuilder();
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
