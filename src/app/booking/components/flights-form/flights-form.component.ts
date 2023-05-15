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
        takeoffDate: fb.control<Date | null>(null, Validators.required),
        landingDate: fb.control<Date | null>(null, Validators.required),
      }),
      // TODO: ensure passengers value is properly filled on mount
      passengers: fb.group({
        adult: fb.control<number>(0, [Validators.required, Validators.min(1), passengersValidator]),
        child: fb.control<number>(0, Validators.required),
        infant: fb.control<number>(0, Validators.required),
      }),
    });

    this.airportForm = this.searchForm.get('airport') as FormGroup;

    const formValue = this.searchService.requestData$.getValue();

    if (formValue != null) {
      this.searchForm.setValue(formValue);
    }
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
