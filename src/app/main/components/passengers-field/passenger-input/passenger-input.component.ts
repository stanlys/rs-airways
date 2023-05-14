import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { PassengerInfo } from '../../../model/main.interfaces';

@Component({
  selector: 'app-passenger-input',
  templateUrl: './passenger-input.component.html',
  styleUrls: ['./passenger-input.component.scss'],
})
export default class PassengerInputComponent implements OnInit {
  @Input() public passenger!: PassengerInfo;

  public passengersForm!: FormGroup;

  public passengerInput!: FormControl;

  public inputValue = 0;

  constructor(private parentForm: FormGroupDirective) {}

  public ngOnInit(): void {
    this.passengersForm = this.parentForm.control;

    this.passengerInput = this.passengersForm.get(this.passenger.inputName) as FormControl;
  }

  public add(): void {
    this.inputValue += 1;
    this.passengerInput.setValue(this.inputValue);
  }

  public substract(): void {
    this.inputValue = this.inputValue > 1 ? this.inputValue - 1 : 0;
    this.passengerInput.setValue(this.inputValue);
  }

  public isDisabled(): boolean {
    return this.passengerInput.value === 0;
  }
}
