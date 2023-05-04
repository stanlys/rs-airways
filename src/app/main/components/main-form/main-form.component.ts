/* eslint-disable no-underscore-dangle */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passengersValidator } from '../../directives/passengers-validator.directive';
import { SearchService } from '../../services/search.service';
import { FlightSearchRequest } from '../../models/flight-search-request.model';
import { Airport } from '../../models/main.interfaces';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
})
export class MainFormComponent {
  public searchForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private search: SearchService) {
    this.searchForm = fb.group({
      oneWay: fb.control<boolean>(false, Validators.required),
      airport: fb.group({
        from: fb.control<Airport | null>(null, Validators.required),
        to: fb.control<Airport | null>(null, Validators.required),
      }),
      dates: fb.group({
        from: fb.control<Date | null>(null, Validators.required),
        to: fb.control<Date | null>(null, Validators.required),
        oneWay: fb.control<Date | null>(null),
      }),
      passengers: fb.group({
        adult: fb.control<number>(0, [Validators.required, Validators.min(1), passengersValidator]),
        child: fb.control<number>(0, [Validators.required]),
        infant: fb.control<number>(0, [Validators.required]),
      }),
    });
  }

  public onSubmit(): void {
    if (!this.searchForm.valid) return;

    this.search.update(this.searchForm.value as FlightSearchRequest);

    this.router.navigate(['/booking']).catch(console.error);
  }
}
