import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

import { AirportFieldComponent } from './components/airport-field/airport-field.component';
import { DatesFieldComponent } from './components/dates-field/dates-field.component';
import PassengerInputComponent from './components/passengers-field/passenger-input/passenger-input.component';
import { PassengersFieldComponent } from './components/passengers-field/passengers-field.component';
import { MaterialModule } from './material/material.module';
import { LocalizedDatePipe } from './pipes/localized-date.pipe';

@NgModule({
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, TranslateModule],
  declarations: [
    AirportFieldComponent,
    DatesFieldComponent,
    PassengersFieldComponent,
    PassengerInputComponent,
    LocalizedDatePipe,
  ],
  providers: [TranslatePipe, DatePipe],
  exports: [
    MaterialModule,
    RouterModule,
    AirportFieldComponent,
    DatesFieldComponent,
    PassengersFieldComponent,
    TranslatePipe,
    LocalizedDatePipe,
  ],
})
export class SharedModule {}
