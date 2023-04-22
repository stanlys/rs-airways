import { Component } from '@angular/core';
import { STORAGE_KEY_PREFIX } from '../../../../shared/constants';

@Component({
  selector: 'app-date-format-selector',
  templateUrl: './date-format-selector.component.html',
  styleUrls: ['./date-format-selector.component.scss'],
})
export class DateFormatSelectorComponent {
  public readonly dateFormats = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY/DD/MM', 'YYYY/MM/DD'];

  public dateFormatItemKey = `${STORAGE_KEY_PREFIX}-dateFormat`;

  public selectedDateFormat = localStorage.getItem(this.dateFormatItemKey) || this.dateFormats[0];

  public selectDateFormat(v: string): void {
    this.selectedDateFormat = v;
    localStorage.setItem(this.dateFormatItemKey, this.selectedDateFormat);
  }
}
