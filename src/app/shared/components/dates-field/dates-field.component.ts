import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Subject, takeUntil } from 'rxjs';

import { DateFormatService } from '../../services/date-format.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-dates-field',
  templateUrl: './dates-field.component.html',
  styleUrls: ['./dates-field.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DatesFieldComponent implements OnInit, OnDestroy {
  @Input() public name!: string;

  @Input() public showFormatHint = true;

  public dateFormatHint = this.dateFormatService.getDateFormat();

  public oneWay?: boolean;

  public datesForm!: FormGroup;

  public takeoffDate!: FormControl;

  public landingDate!: FormControl;

  public date!: FormControl;

  public today = new Date();

  public destroy$ = new Subject<void>();

  constructor(
    public parentForm: FormGroupDirective,
    private cd: ChangeDetectorRef,
    private dateFormatService: DateFormatService
  ) {}

  public ngOnInit(): void {
    this.datesForm = this.parentForm.control.get(this.name) as FormGroup;

    this.takeoffDate = this.datesForm.get('takeoffDate') as FormControl<Date>;
    this.landingDate = this.datesForm.get('landingDate') as FormControl<Date>;

    this.oneWay = !!this.parentForm.control.get('oneWay')?.value;

    this.parentForm.control
      .get('oneWay')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((v: boolean) => {
        this.oneWay = v;

        this.updateValidators(this.oneWay);
        this.updateHint(this.oneWay);
        this.cd.detectChanges();
      });

    this.dateFormatService.dateFormat$.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      this.updateHint(this.oneWay ?? false, v);
      MY_FORMATS.display.dateInput = v.replace('/', '-');
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateHint(flag: boolean, v: string = this.dateFormatService.getDateFormat()): void {
    this.dateFormatHint = flag ? v : `${v} - ${v}`;
  }

  private updateValidators(flag: boolean): void {
    if (!flag) {
      this.landingDate.setValidators(Validators.required);
      this.takeoffDate.setValidators(Validators.required);
    } else {
      this.landingDate.clearValidators();
      this.takeoffDate.clearValidators();
    }
  }
}
