/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-passengers-field',
  templateUrl: './passengers-field.component.html',
  styleUrls: ['./passengers-field.component.scss'],
})
export class PassengersFieldComponent implements OnInit {
  public passengersForm!: FormGroup;

  constructor(private parentForm: FormGroupDirective) {}

  public ngOnInit(): void {
    this.passengersForm = this.parentForm.control.get('passengers') as FormGroup;
  }

  public onSelect(): void {
    this.passengersForm.value.adult = 3;
    this.passengersForm.value.infant = 1;
    console.log(this.passengersForm.value);
  }
}
