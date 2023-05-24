import { Component, EventEmitter, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FlightSearchFormValue } from '../../../shared/models/flight-search.model';
import { SearchService } from '../../../shared/services/search.service';
import { PassengersFormValue } from '../../interfaces/process.interface';
import { ProgressService } from '../../services/progress.service';

interface PassengerForm {
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
export class ProcessPassengersComponent implements OnInit, OnDestroy {
  @Output() public filled = new EventEmitter<boolean>();

  @Output() public valid = new EventEmitter<PassengersFormValue[]>();

  public passengersDescription: string[] = [];

  public passengersForm!: FormGroup;

  public passengers!: FormArray;

  private destroy$ = new Subject<void>();

  constructor(private search: SearchService, private fb: FormBuilder, private progress: ProgressService) {
    this.passengersForm = fb.group({
      passengers: fb.array<PassengerForm>([]),
    });
  }

  public ngOnInit(): void {
    this.passengersDescription = this.getPassengersArray();
    this.passengers = this.passengersForm.controls['passengers'] as FormArray;

    this.passengersDescription.forEach((item, index) => {
      this.addPassenger(item, index);
    });

    this.initPassengersForm();

    this.passengers.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      this.filled.emit(this.passengers.valid);
    });
  }

  // public ngOnChanges(): void {
  // }

  public ngOnDestroy(): void {
    if (this.passengers.valid) {
      this.valid.emit(this.passengers.value as PassengersFormValue[]);
    }

    this.destroy$.next();
    this.destroy$.complete();
  }

  private initPassengersForm(): void {
    const val = this.progress.passengers$.value;

    if (val && val.length === this.passengers.length) {
      this.passengers.setValue(val);
    }

    this.filled.emit(this.passengers.valid);
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
    const passenger = fb.group<PassengerForm>({
      id: fb.control(id) as FormControl<number>,
      type: fb.control(type) as FormControl<string>,
      firstName: fb.control('', [Validators.required, Validators.pattern('[a-zA-Z]+')]),
      lastName: fb.control('', [Validators.required, Validators.pattern('[a-zA-Z]+')]),
      gender: fb.control(null, Validators.required),
      birthDate: fb.control(null, Validators.required),
      assistance: fb.control(false) as FormControl<boolean>,
      luggage: fb.control(0) as FormControl<number>,
    });

    this.passengers.push(passenger);
  }
}
