import { Component, Input, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

import { Flight } from '../../../shared/models/flight-search.interfaces';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss'],
})
export class FlightDetailsComponent implements OnDestroy {
  @Input() public flight!: Flight;

  @Input() public odd!: boolean;

  public locale = this.translateService.currentLang;

  private destroy$ = new Subject<void>();

  constructor(private translateService: TranslateService) {
    translateService.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((e) => {
      this.locale = e.lang;
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
