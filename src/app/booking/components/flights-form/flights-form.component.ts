import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

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

  constructor(private searchService: SearchService) {
    this.searchForm = this.searchService.searchForm;

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
