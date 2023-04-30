// eslint-disable-next-line max-classes-per-file
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Passengers, PASSENGERS } from '../../model/main.interfaces';

@Component({
  selector: 'app-passengers-field',
  templateUrl: './passengers-field.component.html',
  styleUrls: ['./passengers-field.component.scss'],
})
export class PassengersFieldComponent implements OnInit {
  @Input() public formGroupName!: string;

  @ViewChild('option') public option!: MatOption;

  @ViewChild('selectForm') public selectForm!: MatSelect;

  public passengersForm!: FormGroup;

  public adult = PASSENGERS.adult;

  public child = PASSENGERS.child;

  public infant = PASSENGERS.infant;

  public defaultValue = 'Passengers';

  public trigger = 'Passengers';

  constructor(private parentForm: FormGroupDirective) {}

  public ngOnInit(): void {
    this.passengersForm = this.parentForm.control.get(this.formGroupName) as FormGroup;
    this.passengersForm.valueChanges.subscribe(() => {
      this.option.select();
      this.updateTrigger();
    });
  }

  private updateTrigger(): void {
    const value = this.passengersForm.value as Passengers;
    if (!value) return;

    const { adult, child, infant } = value;

    if (adult + child + infant === 0) {
      this.option.deselect();
      return;
    }

    const result = [adult ? `${adult} Adult ` : '', child ? `${child} Child ` : '', infant ? `${infant} Infant` : ''];

    this.trigger = result.filter((str) => str !== '').join(', ');
  }

  public onClose(): void {
    this.passengersForm.markAsTouched();
    console.log('passengerForm', this.passengersForm.valid);
  }
}
