/* eslint-disable import/no-extraneous-dependencies */
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import countryList from 'country-list';
import { GoogleAuthService } from 'src/app/core/services/google.service';
import countryTelData from 'country-telephone-data';
import { passwordStrengthValidator } from '../../../directives/password-strength-validator.directive';
import { RegistrationRequest } from '../../../models/requests.models';
import { AuthService } from '../../../services/auth.service';

interface SignupForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  dateOfBirth: FormControl<Date | null>;
  confirm: FormControl<boolean | null>;
  gender: FormControl<string | null>;
  citizenship: FormControl<string | null>;
  countryCode: FormControl<string | null>;
  phone: FormControl<string | null>;
}

@Component({
  selector: 'app-signup-tab',
  templateUrl: './signup-tab.component.html',
  styleUrls: ['./signup-tab.component.scss'],
})
export class SignupTabComponent {
  public form: FormGroup<SignupForm>;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  public isLoading$ = this.authService.isLoading$;

  @Output() public closeModal = new EventEmitter<void>();

  public maxDate = new Date();

  public countryNames = countryList.getNames();

  public countryCodes = countryTelData.allCountries.map(
    ({ name, dialCode }) => `${name.split(' (')[0]} (+${dialCode})`
  );

  constructor(fb: FormBuilder, private authService: AuthService, private googleAuth: GoogleAuthService) {
    this.form = fb.group<SignupForm>({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(16),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32),
        passwordStrengthValidator(),
      ]),
      firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+')]),
      dateOfBirth: new FormControl(null, Validators.required),
      confirm: new FormControl(null, Validators.required),
      gender: new FormControl('', Validators.required),
      citizenship: new FormControl(''),
      countryCode: new FormControl(''),
      phone: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern('\\d+')]),
    });
  }

  public close(): void {
    this.closeModal.emit();
  }

  public onSubmit(): void {
    const dateOfBirth = this.form.value.dateOfBirth?.toISOString() as string;
    const countryCode = this.form.value.countryCode?.replace(/[^+\d]/g, '') as string;
    const data = { ...this.form.value, dateOfBirth, countryCode };

    this.authService.signup(data as RegistrationRequest);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    this.authService.loggedIn$.subscribe((v) => {
      if (v === true) {
        this.close();
      }
    });
  }

  public google(): void {
    this.googleAuth.GoogleSignUp().finally(() => {
      this.close();
    });
  }
}
