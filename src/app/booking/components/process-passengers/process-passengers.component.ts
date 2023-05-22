import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FlightSearchFormValue } from '../../../shared/models/flight-search.model';
import { SearchService } from '../../../shared/services/search.service';

interface PassengerFormValue {
  id: FormControl<number>;
  type: FormControl<string>;
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  gender: FormControl<'male' | 'female' | null>;
  birthDate: FormControl<Date | null>;
  assistance: FormControl<boolean>;
  luggage: FormControl<number>;
}

@Component({
  selector: 'app-process-passengers',
  templateUrl: './process-passengers.component.html',
  styleUrls: ['./process-passengers.component.scss'],
})
export class ProcessPassengersComponent {
  @Output() public filled = new EventEmitter<boolean>();

  public passengersDescription: string[] = [];

  public passengersForm!: FormGroup;

  public passengers!: FormArray;

  constructor(private search: SearchService, private fb: FormBuilder) {
    this.passengersForm = fb.group({
      passengers: fb.array<PassengerFormValue>([]),
    });
  }

  public ngOnInit(): void {
    this.passengersDescription = this.getPassengersArray();
    this.passengers = this.passengersForm.controls['passengers'] as FormArray;

    this.passengersDescription.forEach((item, index) => {
      this.addPassenger(item, index);
    });

    this.passengers.valueChanges.subscribe((val) => {
      this.filled.emit(this.passengers.valid);
    });
  }

  private getPassengersArray(): string[] {
    const { passengers } = this.search.requestData$.value as FlightSearchFormValue;
    const { adult, child, infant } = passengers;

    return [
      ...new Array<string>(adult).fill('Adult'),
      ...new Array<string>(child).fill('Child'),
      ...new Array<string>(infant).fill('Infant'),
    ];
  }

  private addPassenger(type: string, id: number): void {
    const { fb } = this;
    const passenger = fb.group<PassengerFormValue>({
      id: fb.control(id) as FormControl<number>,
      type: fb.control(type) as FormControl<string>,
      firstName: fb.control('', [Validators.required, Validators.pattern('[a-zA-Z]+')]),
      lastName: fb.control('', [Validators.required, Validators.pattern('[a-zA-Z]+')]),
      gender: fb.control(null, Validators.required),
      birthDate: fb.control(null, Validators.required),
      assistance: fb.control(false) as FormControl<boolean>,
      // luggage: fb.control({ value: 0, disabled: true }) as FormControl<number>,
      luggage: fb.control(0) as FormControl<number>,
    });

    this.passengers.push(passenger);
  }
}
