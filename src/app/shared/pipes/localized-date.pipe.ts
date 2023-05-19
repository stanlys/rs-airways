import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

type DatePipeValue = string | number | Date | null | undefined;

@Pipe({
  name: 'localizedDate',
  pure: false,
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(private translateService: TranslateService, private datePipe: DatePipe) {}

  public transform(value: DatePipeValue, pattern = 'mediumDate'): string | null {
    return this.datePipe.transform(value, pattern, undefined, this.translateService.currentLang);
  }
}
