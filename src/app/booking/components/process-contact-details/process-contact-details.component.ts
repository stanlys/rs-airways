import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import countryList from 'country-list';
import countryTelData from 'country-telephone-data';

@Component({
  selector: 'app-process-contact-details',
  templateUrl: './process-contact-details.component.html',
  styleUrls: ['./process-contact-details.component.scss'],
})
export class ProcessContactDetailsComponent {
  @Output() public filled = new EventEmitter<boolean>();

  public contactDetailsForm!: FormGroup;

  public emailField!: FormControl;

  public countryCodeField!: FormControl;

  public phoneNumberField!: FormControl;

  public countryNames = countryList.getNames();

  public countryCodes = countryTelData.allCountries.map(
    ({ name, dialCode }) => `${name.split(' (')[0]} (+${dialCode})`
  );

  constructor(private fb: FormBuilder) {
    this.contactDetailsForm = fb.group({
      countryCode: fb.control('', Validators.required),
      phone: fb.control('', [Validators.required, Validators.maxLength(15), Validators.pattern('\\d+')]),
      email: fb.control('', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(16)]),
    });
  }

  public ngOnInit(): void {
    this.emailField = this.contactDetailsForm.controls['email'] as FormControl<string>;
    this.countryCodeField = this.contactDetailsForm.get('countryCode') as FormControl<string>;
    this.phoneNumberField = this.contactDetailsForm.get('phone') as FormControl<string>;

    this.contactDetailsForm.valueChanges.subscribe(() => {
      this.filled.emit(this.contactDetailsForm.valid);
    });
  }
}
