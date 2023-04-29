import { Component, Input } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-dates-field',
  templateUrl: './dates-field.component.html',
  styleUrls: ['./dates-field.component.scss'],
})
export class DatesFieldComponent {
  @Input() public formGroupName!: string;

  public datesForm!: FormGroup;

  constructor(private parentForm: FormGroupDirective) {}

  public ngOnInit(): void {
    this.datesForm = this.parentForm.control.get(this.formGroupName) as FormGroup;
  }
}
