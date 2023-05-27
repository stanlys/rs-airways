import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import countryList from 'country-list';
import countryTelData from 'country-telephone-data';
import { Subject, takeUntil } from 'rxjs';
import { IContacts } from '../../interfaces/process.interface';
import { PassengersService } from '../../services/passengers.service';

@Component({
  selector: 'app-process-contact-details',
  templateUrl: './process-contact-details.component.html',
  styleUrls: ['./process-contact-details.component.scss'],
})
export class ProcessContactDetailsComponent implements OnInit, OnDestroy {
  @Output() public filled = new EventEmitter<boolean>();

  @Output() public valid = new EventEmitter<IContacts>();

  public contactDetailsForm!: FormGroup;

  public emailField!: FormControl;

  public countryCodeField!: FormControl;

  public phoneNumberField!: FormControl;

  public countryNames = countryList.getNames();

  public destroy$ = new Subject<void>();

  public countryCodes = countryTelData.allCountries.map(
    ({ name, dialCode }) => `${name.split(' (')[0]} (+${dialCode})`
  );

  public locale = this.translateService.currentLang;

  constructor(
    private fb: FormBuilder,
    private progress: PassengersService,
    private translateService: TranslateService
  ) {
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

    if (this.progress.contacts$.value) {
      this.contactDetailsForm.setValue(this.progress.contacts$.value);
    }

    this.filled.emit(this.contactDetailsForm.valid);
    this.contactDetailsForm.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.filled.emit(this.contactDetailsForm.valid);
    });

    this.translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((e) => {
      this.locale = e.lang;
    });
  }

  public ngOnDestroy(): void {
    if (this.contactDetailsForm.valid) {
      this.valid.emit(this.contactDetailsForm.value as IContacts);
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
}
