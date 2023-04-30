import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { PassengerInfo } from '../../../model/main.interfaces';

@Component({
  selector: 'app-passenger-input',
  templateUrl: './passenger-input.component.html',
  styleUrls: ['./passenger-input.component.scss'],
})
export default class PassengerInputComponent implements OnInit {
  @Input() public passenger!: PassengerInfo;

  // @Output() public addPassenger = new EventEmitter();

  public passengersForm!: FormGroup;

  public passengerInput!: FormControl;

  constructor(private parentForm: FormGroupDirective) {}

  public ngOnInit(): void {
    this.passengersForm = this.parentForm.control;

    this.passengerInput = this.passengersForm.get(this.passenger.inputName) as FormControl;
  }

  public add(): void {
    const val = this.passengerInput.value as number;
    this.passengerInput.setValue(val + 1);
  }

  public substract(): void {
    const val = this.passengerInput.value as number;
    if (val === 0) return;
    this.passengerInput.setValue(val - 1);
    this.passengersForm.updateValueAndValidity();
  }

  public isDisabled(): boolean {
    return this.passengerInput.value === 0;
  }

  // public isSelected(): boolean {
  //   return this.passengerInput.value === 0 || this.passengerInput.untouched;
  // }
}
