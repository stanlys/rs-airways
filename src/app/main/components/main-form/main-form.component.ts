/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
})
export class MainFormComponent implements OnInit {
  public searchForm: FormBuilder;

  public myControl: FormControl<string | null>;

  public filteredOptions: Observable<string[]> | undefined;

  public options = ['11', '212', '312', 'ffgfgh', 'fhfgdg', 'asasas', 'fgh', 'klklk'];

  constructor() {
    this.searchForm = new FormBuilder();
    this.myControl = new FormControl('', Validators.required);
  }

  public ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  }
}
