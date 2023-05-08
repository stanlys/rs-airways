import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { passengersValidator } from '../../../main/directives/passengers-validator.directive';
import { AirportForm } from '../../../main/models/main.interfaces';
import { SearchService } from '../../../main/services/search.service';

@Component({
  selector: 'app-flights-form',
  templateUrl: './flights-form.component.html',
  styleUrls: ['./flights-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightsFormComponent implements OnDestroy {
  public searchForm: FormGroup;

  public airportForm: FormGroup;

  private destroy$ = new Subject<void>();

  constructor(fb: FormBuilder, private searchService: SearchService) {
    const airport = fb.group({
      from: fb.control<AirportForm | null>(null, Validators.required),
      to: fb.control<AirportForm | null>(null, Validators.required),
    });

    const dates = fb.group({
      from: fb.control<Date | null>(null, Validators.required),
      to: fb.control<Date | null>(null, Validators.required),
      oneWay: fb.control<Date | null>(null),
    });

    const passengers = fb.group({
      adult: fb.control<number>(0, [Validators.required, Validators.min(1), passengersValidator]),
      child: fb.control<number>(0, Validators.required),
      infant: fb.control<number>(0, Validators.required),
    });

    this.searchForm = fb.group({
      airport,
      dates,
      passengers,
    });

    this.airportForm = this.searchForm.get('airport') as FormGroup;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
