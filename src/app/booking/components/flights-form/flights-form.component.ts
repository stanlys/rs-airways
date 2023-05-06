import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passengersValidator } from '../../../main/directives/passengers-validator.directive';
import { FlightSearchFormValue, FlightSearchRequest } from '../../../main/models/flight-search.model';
import { AirportForm } from '../../../main/models/main.interfaces';
import { SearchService } from '../../../main/services/search.service';

@Component({
  selector: 'app-flights-form',
  templateUrl: './flights-form.component.html',
  styleUrls: ['./flights-form.component.scss'],
})
export class FlightsFormComponent {
  public searchForm: FormGroup;

  public airportForm: FormGroup;

  constructor(fb: FormBuilder, private router: Router, private search: SearchService) {
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
    const { airport, dates } = this.searchForm.value as FlightSearchFormValue;
    const { from, to } = airport;
    const { IATA: fromKey } = from;
    const { IATA: toKey } = to;
    const forwardDate = dates.from.toISOString();
    const backDate = dates.to?.toISOString();

    const requestData: FlightSearchRequest = {
      fromKey,
      toKey,
      forwardDate,
      backDate,
    };

    this.search.update(requestData);

    this.router.navigate(['/booking']).catch(console.error);
  }
}
