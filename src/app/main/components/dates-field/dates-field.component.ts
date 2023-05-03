import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-dates-field',
  templateUrl: './dates-field.component.html',
  styleUrls: ['./dates-field.component.scss'],
})
export class DatesFieldComponent {
  @Input() public formGroupName!: string;

  public dateFormatHint = 'MM/DD/YYYY - MM/DD/YYYY';

  public isOneWay = false;

  public datesForm!: FormGroup;

  public dateFrom!: FormControl;

  public dateTo!: FormControl;

  public date!: FormControl;

  public today = new Date();

  constructor(public parentForm: FormGroupDirective) {}

  public ngOnInit(): void {
    this.datesForm = this.parentForm.control.get(this.formGroupName) as FormGroup;

    this.dateFrom = this.datesForm.get('from') as FormControl;
    this.dateTo = this.datesForm.get('to') as FormControl;
    this.date = this.datesForm.get('oneWay') as FormControl;
    this.updateValidators();

    this.parentForm.control
      .get('oneWay')
      ?.valueChanges.pipe()
      .subscribe((v) => {
        this.isOneWay = v as boolean;
        console.log(this.isOneWay);

        setTimeout(() => {
          this.updateValidators();
          this.updateHint();
        }, 0);
      });
  }

  private updateHint(): void {
    this.dateFormatHint = this.isOneWay ? 'MM/DD/YYYY' : 'MM/DD/YYYY - MM/DD/YYYY';
  }

  private updateValidators(): void {
    console.log('update validators', this.isOneWay);

    if (!this.isOneWay) {
      this.date.clearValidators();
      this.dateTo.setValidators(Validators.required);
      this.dateFrom.setValidators(Validators.required);

      console.log('range');
    } else {
      this.date.setValidators(Validators.required);
      this.dateTo.clearValidators();
      this.dateFrom.clearValidators();

      console.log('single');
    }

    this.date.updateValueAndValidity();
    this.dateTo.updateValueAndValidity();
    this.dateFrom.updateValueAndValidity();
  }
}
