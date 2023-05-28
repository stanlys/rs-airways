import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { PassengersFormValue } from '../../interfaces/process.interface';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-process-passenger-card',
  templateUrl: './process-passenger-card.component.html',
  styleUrls: ['./process-passenger-card.component.scss'],
})
export class ProcessPassengerCardComponent implements OnInit, OnDestroy {
  @Input() public index = 1;

  @Input() public title = 'Adult';

  public passengerTitle = '';

  public today = new Date();

  public maxDate!: Date;

  public minDate!: Date;

  public passenger!: FormGroup;

  public passengers!: FormArray;

  public firstName!: FormControl;

  public lastName!: FormControl;

  public gender!: FormControl;

  public birthDate!: FormControl;

  public assistance!: FormControl;

  public luggage!: FormControl;

  public luggageGroup!: FormGroup;

  public isIncluded!: FormControl;

  private destroy$ = new Subject<void>();

  public locale = this.translateService.currentLang;

  constructor(
    private parentForm: FormGroupDirective,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private progress: ProgressService,
    private translateService: TranslateService
  ) {
    this.passengers = this.parentForm.control.get('passengers') as FormArray;

    this.luggageGroup = fb.group({
      isIncluded: fb.control(false),
    });
  }

  public ngOnInit(): void {
    this.passenger = this.passengers.controls[this.index - 1] as FormGroup;

    this.firstName = this.passenger.get('firstName') as FormControl;
    this.lastName = this.passenger.get('lastName') as FormControl;

    this.gender = this.passenger.get('gender') as FormControl;

    this.birthDate = this.passenger.get('birthDate') as FormControl;

    this.isIncluded = this.luggageGroup.get('isIncluded') as FormControl;

    this.assistance = this.passenger.get('assistance') as FormControl;
    this.luggage = this.passenger.get('luggage') as FormControl;

    if (this.luggage.value) {
      this.isIncluded.setValue(true);
    }

    this.luggage.valueChanges.subscribe((val) => {
      if (val === 0) this.isIncluded.setValue(false);
    });

    this.transformTitleForTranslate();

    this.translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((e) => {
      this.locale = e.lang;
    });

    this.getDateValidators();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getDateValidators(): void {
    const { type } = this.passenger.value as PassengersFormValue;

    switch (type) {
      case 'Infant': {
        this.maxDate = this.today;
        this.minDate = this.getYearAgo(this.today, 2);
        break;
      }

      case 'Child': {
        this.maxDate = this.getYearAgo(this.today, 2);
        this.minDate = this.getYearAgo(this.today, 14);
        break;
      }
      default: {
        this.maxDate = this.getYearAgo(this.today, 14);
        this.minDate = new Date(0);
        break;
      }
    }
  }

  public substract(): void {
    const val = this.luggage.value as number;
    if (val > 0) {
      this.luggage.setValue(val - 1);
    }
  }

  public add(): void {
    const val = this.luggage.value as number;
    this.luggage.setValue(val + 1);
  }

  public onToggle(): void {
    const val = this.isIncluded.value ? 1 : 0;
    this.luggage.setValue(val);
  }

  private transformTitleForTranslate(): void {
    this.passengerTitle = `PASSENGER.${this.title}`;
  }

  // eslint-disable-next-line class-methods-use-this
  private getYearAgo(date: Date, years: number): Date {
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();

    return new Date(y - years, m, d);
  }
}
