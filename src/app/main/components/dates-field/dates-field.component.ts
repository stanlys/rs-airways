import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-dates-field',
  templateUrl: './dates-field.component.html',
  styleUrls: ['./dates-field.component.scss'],
})
export class DatesFieldComponent implements OnInit {
  @Input() public formGroupName!: string;

  public dateFormatHint = 'MM/DD/YYYY - MM/DD/YYYY';

  public isOneWay = false;

  public datesForm!: FormGroup;

  public dateFrom!: FormControl;

  public dateTo!: FormControl;

  public date!: FormControl;

  public today = new Date();

  constructor(public parentForm: FormGroupDirective, private cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.datesForm = this.parentForm.control.get(this.formGroupName) as FormGroup;

    this.dateFrom = this.datesForm.get('from') as FormControl<Date>;
    this.dateTo = this.datesForm.get('to') as FormControl<Date>;
    this.date = this.datesForm.get('oneWay') as FormControl<Date>;

    this.parentForm.control.get('oneWay')?.valueChanges.subscribe((v) => {
      this.isOneWay = v as boolean;

      this.updateValidators(this.isOneWay);
      this.updateHint(this.isOneWay);
      this.cd.detectChanges();
    });
  }

  private updateHint(flag: boolean): void {
    this.dateFormatHint = flag ? 'MM/DD/YYYY' : 'MM/DD/YYYY - MM/DD/YYYY';
  }

  private updateValidators(flag: boolean): void {
    if (!flag) {
      this.date.clearValidators();
      this.dateTo.setValidators(Validators.required);
      this.dateFrom.setValidators(Validators.required);
    } else {
      this.date.setValidators(Validators.required);
      this.dateTo.clearValidators();
      this.dateFrom.clearValidators();
    }
  }
}
