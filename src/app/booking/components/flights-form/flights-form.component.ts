import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { passengersValidator } from '../../../main/directives/passengers-validator.directive';
import { AirportForm } from '../../../shared/models/flight-search.interfaces';
import { FlightSearchFormValue } from '../../../shared/models/flight-search.model';
import { SearchService } from '../../../shared/services/search.service';

@Component({
  selector: 'app-flights-form',
  templateUrl: './flights-form.component.html',
  styleUrls: ['./flights-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightsFormComponent implements OnDestroy {
  public searchForm: FormGroup;

  public airportForm: FormGroup;

  @Output() public hideForm = new EventEmitter<void>();

  private destroy$ = new Subject<void>();

  constructor(fb: FormBuilder, private searchService: SearchService) {
    this.searchForm = fb.group({
      oneWay: fb.control<boolean>(false, Validators.required),
      airport: fb.group({
        fromLoc: fb.control<AirportForm | null>(null, Validators.required),
        toLoc: fb.control<AirportForm | null>(null, Validators.required),
      }),
      dates: fb.group({
        fromDate: fb.control<Date | null>(null, Validators.required),
        toDate: fb.control<Date | null>(null, Validators.required),
      }),
      passengers: fb.group({
        adult: fb.control<number>(0, [Validators.required, Validators.min(1), passengersValidator]),
        child: fb.control<number>(0, Validators.required),
        infant: fb.control<number>(0, Validators.required),
      }),
    });

    this.airportForm = this.searchForm.get('airport') as FormGroup;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(): void {
    this.searchService.update(this.searchForm.value as FlightSearchFormValue);
    this.searchForm.reset();
    this.hideForm.emit();
  }
}
