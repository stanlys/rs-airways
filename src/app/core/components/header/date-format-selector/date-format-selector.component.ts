import { Component } from '@angular/core';
import { DateFormatService } from '../../../../shared/services/date-format.service';

@Component({
  selector: 'app-date-format-selector',
  templateUrl: './date-format-selector.component.html',
  styleUrls: ['./date-format-selector.component.scss'],
})
export class DateFormatSelectorComponent {
  public readonly dateOpts = this.dateFormatService.dateOpts;

  public selectedDateFormat = this.dateFormatService.getDateFormat();

  constructor(private dateFormatService: DateFormatService) {}

  public selectDateFormat(v: string): void {
    this.selectedDateFormat = v;
    this.dateFormatService.setDateFormat(v);
  }
}
