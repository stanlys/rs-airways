import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MainFormComponent } from './components/main-form/main-form.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AirportFieldComponent } from './components/flight-route/airport-field/airport-field.component';
import { DatesFieldComponent } from './components/dates-field/dates-field.component';
import { PassengersFieldComponent } from './components/passengers-field/passengers-field.component';
import { FlightRouteComponent } from './components/flight-route/flight-route.component';
import PassengerInputComponent from './components/passengers-field/passenger-input/passenger-input.component';

@NgModule({
  declarations: [
    MainPageComponent,
    MainFormComponent,
    AirportFieldComponent,
    DatesFieldComponent,
    PassengersFieldComponent,
    FlightRouteComponent,
    PassengerInputComponent,
  ],
  imports: [CommonModule, MainRoutingModule, MaterialModule, SharedModule, ReactiveFormsModule],
})
export class MainModule {}
