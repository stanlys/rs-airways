import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable, map, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

import { AirportForm } from '../../models/flight-search.interfaces';
import { SearchService } from '../../services/search.service';

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

  public filteredOptions?: Observable<AirportForm[]> | undefined;

  public options: AirportForm[] = [];

  public parentForm!: FormGroup;

  public airportForm!: FormControl<AirportForm>;

  constructor(private parentFormGroup: FormGroupDirective, private search: SearchService) {}

  public ngOnInit(): void {
    this.parentForm = this.parentFormGroup.control;
    this.airportForm = this.parentFormGroup.control.get(this.formName) as FormControl<AirportForm>;

    this.filteredOptions = this.airportForm.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val) => this.filterAirports(val))
    );
  }

  // eslint-disable-next-line class-methods-use-this
  public showAirport(airport: AirportForm): string {
    return airport && airport.city ? `${airport.city} ${airport.name ? airport.name : ''}, ${airport.key}` : '';
  }

  private filterAirports(value: string | AirportForm): Observable<AirportForm[]> {
    const filterCity = typeof value === 'string' ? value.toLowerCase() : value.city.toLowerCase();
    const filterKey = typeof value === 'string' ? value.toLowerCase() : value.key.toLowerCase();
    const filterName = typeof value === 'string' ? value.toLowerCase() : value.name.toLowerCase();

    return this.search
      .getAirports(value as string)
      .pipe(
        map((response) =>
          response.filter(
            (option) =>
              option.city.toLowerCase().includes(filterCity) ||
              option.key.toLowerCase().includes(filterKey) ||
              option.name.toLowerCase().includes(filterName)
          )
        )
      );
  }
}
