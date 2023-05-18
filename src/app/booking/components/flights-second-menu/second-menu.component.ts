import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { SearchService } from '../../../shared/services/search.service';

@Component({
  selector: 'app-second-menu',
  templateUrl: './second-menu.component.html',
  styleUrls: ['./second-menu.component.scss'],
})
export class SecondMenuComponent implements OnDestroy {
  public requestData$ = this.searchService.requestData$;

  public passengerAmount = 0;

  @Output() public toggleSearchForm = new EventEmitter<void>();

  private destroy$ = new Subject<void>();

  @Input() public editable = false;

  constructor(private searchService: SearchService) {
    this.searchService.requestData$.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      if (v != null) {
        this.passengerAmount = Object.values(v.passengers).reduce((a: number, b: number) => a + b, 0) as number;
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
