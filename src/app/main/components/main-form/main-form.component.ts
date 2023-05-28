/* eslint-disable import/no-extraneous-dependencies */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { FlightSearchFormValue } from '../../../shared/models/flight-search.model';
import { SearchService } from '../../../shared/services/search.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss'],
})
export class MainFormComponent {
  public searchForm = this.searchService.searchForm;

  constructor(private router: Router, private searchService: SearchService, public translate: TranslateService) {}

  public onSubmit(): void {
    this.searchService.update(this.searchForm.value as FlightSearchFormValue);
    this.router.navigate(['/booking']).catch(console.error);
  }
}
