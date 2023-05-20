import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FlightSearchFormValue } from '../../../shared/models/flight-search.model';
import { SearchService } from '../../../shared/services/search.service';

interface PassengerFormValue {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  gender: FormControl<'male' | 'femail' | null>;
  birthDate: FormControl<Date | null>;
}

@Component({
  selector: 'app-process-passengers',
  templateUrl: './process-passengers.component.html',
  styleUrls: ['./process-passengers.component.scss'],
})
export class ProcessPassengersComponent {
  public passengers: string[] = [];

  public passengersForm!: FormArray;

  constructor(private search: SearchService, fb: FormBuilder) {
    this.passengersForm = fb.array<PassengerFormValue>([], Validators.required);
  }

  public ngOnInit(): void {
    this.passengers = this.getPassengersArray();
  }

  private getPassengersArray(): string[] {
    // const result: string[] = [];
    const { passengers } = this.search.requestData$.value as FlightSearchFormValue;
    const { adult, child, infant } = passengers;
    console.log(passengers);

    return [
      ...new Array<string>(adult).fill('Adult'),
      ...new Array<string>(child).fill('Child'),
      ...new Array<string>(infant).fill('Infant'),
    ];

    // for (let i = 0; i < adult; i += 1) {
    //   result.push('Adult');
    // }

    // for (let i = 0; i < child; i += 1) {
    //   result.push('Child');
    // }

    // for (let i = 0; i < infant; i += 1) {
    //   result.push('Infant');
    // }

    // console.log(result);

    // return result;
  }
}
