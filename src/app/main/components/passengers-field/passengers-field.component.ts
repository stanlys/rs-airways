import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Passengers, PASSENGERS } from '../../model/main.interfaces';

@Component({
  selector: 'app-passengers-field',
  templateUrl: './passengers-field.component.html',
  styleUrls: ['./passengers-field.component.scss'],
})
export class PassengersFieldComponent implements OnInit {
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
    this.passengersForm = this.parentForm.control.get('passengers') as FormGroup;
    this.passengersForm.valueChanges.subscribe(() => {
      this.option.select();
      this.updateTrigger();
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public onClosed(): void {}

  // eslint-disable-next-line class-methods-use-this
  public onSelect(): void {
    console.log('selestion cgange');
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

    console.log(this.passengersForm.valid);
  }
}
