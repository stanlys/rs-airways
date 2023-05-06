import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passengersValidator } from '../../../main/directives/passengers-validator.directive';
import { AirportForm } from '../../../main/models/main.interfaces';
import { SearchService } from '../../../main/services/search.service';
import { FlightSearchFormValue } from '../../../main/models/flight-search.model';

@Component({
  selector: 'app-flights-form',
  templateUrl: './flights-form.component.html',
  styleUrls: ['./flights-form.component.scss'],
})
export class FlightsFormComponent {
  public searchForm: FormGroup;

  public airportForm: FormGroup;

  constructor(fb: FormBuilder, private router: Router, private searchService: SearchService) {
    this.searchForm = fb.group({
      oneWay: fb.control<boolean>(false, Validators.required),
      airport: fb.group({
        from: fb.control<AirportForm | null>(null, Validators.required),
        to: fb.control<AirportForm | null>(null, Validators.required),
      }),
      dates: fb.group({
        from: fb.control<Date | null>(null, Validators.required),
        to: fb.control<Date | null>(null, Validators.required),
        oneWay: fb.control<Date | null>(null),
      }),
      passengers: fb.group({
        adult: fb.control<number>(0, [Validators.required, Validators.min(1), passengersValidator]),
        child: fb.control<number>(0, Validators.required),
        infant: fb.control<number>(0, Validators.required),
      }),
    });

    this.airportForm = this.searchForm.get('airport') as FormGroup;
  }

  public onSubmit(): void {
    this.searchService.update(this.searchForm.value as FlightSearchFormValue);
    this.router.navigate(['/booking']).catch(console.error);
  }
}
