import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import countryList from 'country-list';
import countryTelData from 'country-telephone-data';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent {
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
    this.emailField = this.contactDetailsForm.controls['email'] as FormControl;
    this.countryCodeField = this.contactDetailsForm.get('countryCode') as FormControl;
    this.phoneNumberField = this.contactDetailsForm.get('phone') as FormControl;
  }
}
