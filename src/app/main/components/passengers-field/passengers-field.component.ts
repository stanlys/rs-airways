import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { PASSENGERS } from '../../model/main.interfaces';

@Component({
  selector: 'app-passengers-field',
  templateUrl: './passengers-field.component.html',
  styleUrls: ['./passengers-field.component.scss'],
})
export class PassengersFieldComponent implements OnInit {
  public passengersForm!: FormGroup;

  public adult = PASSENGERS.adult;

  public child = PASSENGERS.child;

  public infant = PASSENGERS.infant;

  constructor(private parentForm: FormGroupDirective) {}

  public ngOnInit(): void {
    this.passengersForm = this.parentForm.control.get('passengers') as FormGroup;
    console.log(this.passengersForm.value);
  }

  public onClosed(): void {
    console.log(this.passengersForm.value);
  }

  public onSelect(): void {
    console.log('selestion cgange', this.passengersForm);
  }

  // eslint-disable-next-line class-methods-use-this
  public trigger(): Array<string> {
    return ['2 Adult', '3 Child', '1 Infant'];
  }
}
