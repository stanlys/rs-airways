import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dates-field',
  templateUrl: './dates-field.component.html',
  styleUrls: ['./dates-field.component.scss'],
})
export class DatesFieldComponent implements OnInit, OnDestroy {
  @Input() public name!: string;

  @Input() public showFormatHint = true;

  public dateFormatHint = 'MM/DD/YYYY - MM/DD/YYYY';

  public isOneWay = false;

  public datesForm!: FormGroup;

  public takeoffDate!: FormControl;

  public landingDate!: FormControl;

  public date!: FormControl;

  public today = new Date();

  public destroy$ = new Subject<void>();

  constructor(public parentForm: FormGroupDirective, private cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.datesForm = this.parentForm.control.get(this.name) as FormGroup;

    this.takeoffDate = this.datesForm.get('takeoffDate') as FormControl<Date>;
    this.landingDate = this.datesForm.get('landingDate') as FormControl<Date>;

    this.parentForm.control
      .get('oneWay')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((v) => {
        this.isOneWay = v as boolean;

        this.updateValidators(this.isOneWay);
        this.updateHint(this.isOneWay);
        this.cd.detectChanges();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateHint(flag: boolean): void {
    this.dateFormatHint = flag ? 'MM/DD/YYYY' : 'MM/DD/YYYY - MM/DD/YYYY';
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
