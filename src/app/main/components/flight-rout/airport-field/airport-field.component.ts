/* eslint-disable no-underscore-dangle */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { Airport } from '../../../model/main.interfaces';
import { AIRPORTS } from '../../../model/mock-airports-list.model';

@Component({
  selector: 'app-airport-field',
  templateUrl: './airport-field.component.html',
  styleUrls: ['./airport-field.component.scss'],
})
export class AirportFieldComponent implements OnInit {
  @Input() public direction = '';

  @Input() public placeholder = '';

  @Input() public formName = '';

  @Output() public enter = new EventEmitter<Airport>();

  public filteredOptions: Observable<Airport[]> | undefined;

  public options = AIRPORTS;

  public parentForm!: FormGroup;

  public airportForm!: FormControl;

  constructor(private parentFormGroup: FormGroupDirective) {}

  public ngOnInit(): void {
    this.parentForm = this.parentFormGroup.control;
    this.airportForm = this.parentFormGroup.control.get(this.formName) as FormControl;
    console.log(this.airportForm.value);

    this.filteredOptions = this.airportForm.valueChanges.pipe(
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
    return airport && airport.city ? `${airport.city} ${airport.name ? airport.name : ''}, ${airport.IATA}` : '';
  }

  private _filter(value: string | Airport): Airport[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.city.toLowerCase();

    return this.options.filter((option) => option.city.toLowerCase().includes(filterValue));
  }
}
