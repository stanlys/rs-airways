import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-dates-field',
  templateUrl: './dates-field.component.html',
  styleUrls: ['./dates-field.component.scss'],
})
export class DatesFieldComponent {
  @Input() public formGroupName!: string;

  public dateFormatHint = 'MM/DD/YYYY - MM/DD/YYYY';

  public datesForm!: FormGroup;

  public dateFrom!: FormControl;

  public dateTo!: FormControl;

  constructor(private parentForm: FormGroupDirective) {}

  public ngOnInit(): void {
    this.datesForm = this.parentForm.control.get(this.formGroupName) as FormGroup;

    this.dateFrom = this.datesForm.get('from') as FormControl;
    this.dateTo = this.datesForm.get('to') as FormControl;
  }

  public onDatesSet(): void {
    console.log(this.datesForm.value);
  }
}
