import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-process-passenger-card',
  templateUrl: './process-passenger-card.component.html',
  styleUrls: ['./process-passenger-card.component.scss'],
})
export class ProcessPassengerCardComponent implements OnInit {
  @Input() public index = 1;

  @Input() public title = 'Adult';

  public tooltip = `Add the passenger's name as it is written on their documents (passport or ID). Do not use any accents or special characters. Do not use a nickname.`;

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

  constructor(private parentForm: FormGroupDirective, private cd: ChangeDetectorRef, private fb: FormBuilder) {
    this.passengers = this.parentForm.control.get('passengers') as FormArray;

    this.luggageGroup = fb.group({
      isIncluded: fb.control(false),
    });
  }

  public ngOnInit(): void {
    this.passenger = this.passengers.controls[this.index - 1] as FormGroup;

    this.firstName = this.passenger.get('firstName') as FormControl;
    this.lastName = this.passenger.get('lastName') as FormControl;

    this.birthDate = this.passenger.get('birthDate') as FormControl;

    this.isIncluded = this.luggageGroup.get('isIncluded') as FormControl;

    this.assistance = this.passenger.get('assistance') as FormControl;
    this.luggage = this.passenger.get('luggage') as FormControl;

    this.luggage.valueChanges.subscribe((val) => {
      if (val === 0) this.isIncluded.setValue(false);
    });

    this.getDateValidators();
  }

  private getDateValidators(): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { type } = this.passenger.value;

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

  // eslint-disable-next-line class-methods-use-this
  private getYearAgo(date: Date, years: number): Date {
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();

    return new Date(y - years, m, d);
  }
}
