import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';

import { selectRequiredOption } from '../../../main/directives/passengers-validator.directive';
import { PassengerInfo, Passengers, PassSelectOption } from '../../models/flight-search.interfaces';

const PASSENGERS: PassengerInfo[] = [
  {
    name: 'Adult',
    description: '14+ years',
    inputName: 'adult',
    defaultAmount: 0,
  },
  {
    name: 'Child',
    description: '2-14 years',
    inputName: 'child',
    defaultAmount: 0,
  },
  {
    name: 'Infant',
    description: '0-2 years',
    inputName: 'infant',
    defaultAmount: 0,
  },
];

@Component({
  selector: 'app-passengers-field',
  templateUrl: './passengers-field.component.html',
  styleUrls: ['./passengers-field.component.scss'],
})
export class PassengersFieldComponent implements OnInit {
  @Input() public name!: string;

  @ViewChildren('option') public options!: QueryList<MatOption>;

  public passengersForm!: FormGroup;

  public passSelect = new FormControl<PassSelectOption[]>([], [Validators.required, selectRequiredOption()]);

  public passengers = PASSENGERS;

  public triggerValue = '';

  constructor(private parentForm: FormGroupDirective) {}

  public ngOnInit(): void {
    this.passengersForm = this.parentForm.control.get(this.name) as FormGroup;

    const passengersFormValue = this.passengersForm.getRawValue() as Passengers;

    const passSelectValue = this.passengers
      .map(({ name, inputName }) => {
        const amount = passengersFormValue[inputName as keyof Passengers];
        return { name, amount };
      })
      .filter(({ amount }) => amount > 0);

    this.passSelect.setValue(passSelectValue);

    this.triggerValue = passSelectValue.map((item) => `${item.amount} ${item.name}`).join(', ') || '';
  }

  // eslint-disable-next-line class-methods-use-this
  public compareFn(o1: PassSelectOption, o2: PassSelectOption): boolean {
    return o1 && o2 && o1.name === o2.name;
  }

  private updateTrigger(): void {
    const result = this.options.map((item) => item.value as PassSelectOption);

    if (!result) return;

    this.triggerValue = result
      .filter((item) => !!item.amount)
      .map((item) => `${item.amount} ${item.name}`)
      .join(', ');
  }

  public onSelect(id: number): void {
    const option = this.options.get(id);

    if (!option) {
      return;
    }

    const val = option.value as PassSelectOption;

    if (val.amount > 0) {
      option.select();
    } else {
      option.deselect();
    }

    this.updateTrigger();
  }
}
