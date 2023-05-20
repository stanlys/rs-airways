import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import countryList from 'country-list';
import countryTelData from 'country-telephone-data';

@Component({
  selector: 'app-process-contact-details',
  templateUrl: './process-contact-details.component.html',
  styleUrls: ['./process-contact-details.component.scss'],
})
export class ProcessContactDetailsComponent {
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
      phone: fb.control('', Validators.required),
      email: fb.control('', Validators.required),
    });
  }

  public ngOnInit(): void {
    this.emailField = this.contactDetailsForm.controls['email'] as FormControl<string>;
    this.countryCodeField = this.contactDetailsForm.get('countryCode') as FormControl<string>;
    this.phoneNumberField = this.contactDetailsForm.get('phone') as FormControl<string>;
  }
}
