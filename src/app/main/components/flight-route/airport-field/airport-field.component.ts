/* eslint-disable no-underscore-dangle */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { AIRPORTS } from '../../../mock-airports-list';
import { AirportForm } from '../../../models/main.interfaces';

@Component({
  selector: 'app-airport-field',
  templateUrl: './airport-field.component.html',
  styleUrls: ['./airport-field.component.scss'],
})
export class AirportFieldComponent implements OnInit {
  @Input() public direction = '';

  @Input() public placeholder = '';

  @Input() public formName = '';

  @Output() public enter = new EventEmitter<AirportForm>();

  public filteredOptions: Observable<AirportForm[]> | undefined;

  public options = AIRPORTS;

  public parentForm!: FormGroup;

  public airportForm!: FormControl;

  constructor(private parentFormGroup: FormGroupDirective) {}

  public ngOnInit(): void {
    this.parentForm = this.parentFormGroup.control;
    this.airportForm = this.parentFormGroup.control.get(this.formName) as FormControl;

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
  public showAirport(airport: AirportForm): string {
    return airport && airport.city ? `${airport.city} ${airport.name ? airport.name : ''}, ${airport.IATA}` : '';
  }

  private _filter(value: string | AirportForm): AirportForm[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.city.toLowerCase();

    return this.options.filter((option) => option.city.toLowerCase().includes(filterValue));
  }
}
