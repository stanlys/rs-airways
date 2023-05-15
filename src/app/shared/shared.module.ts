import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

import { AirportFieldComponent } from './components/airport-field/airport-field.component';
import { DatesFieldComponent } from './components/dates-field/dates-field.component';
import PassengerInputComponent from './components/passengers-field/passenger-input/passenger-input.component';
import { PassengersFieldComponent } from './components/passengers-field/passengers-field.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [MaterialModule, CommonModule, ReactiveFormsModule, TranslateModule],
  declarations: [AirportFieldComponent, DatesFieldComponent, PassengersFieldComponent, PassengerInputComponent],
  providers: [TranslatePipe],
  exports: [
    MaterialModule,
    RouterModule,
    AirportFieldComponent,
    DatesFieldComponent,
    PassengersFieldComponent,
    TranslatePipe,
  ],
})
export class SharedModule {}
