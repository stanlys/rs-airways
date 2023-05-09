import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { BookingRoutingModule } from './booking-routing.module';
import { FlightsFormComponent } from './components/flights-form/flights-form.component';
import { SecondMenuComponent } from './components/second-menu/second-menu.component';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { FlightsCalendarComponent } from './components/flights-calendar/flights-calendar.component';
import { FlightComponent } from './components/flights-calendar/flight/flight.component';

@NgModule({
  declarations: [
    BookingPageComponent,
    SecondMenuComponent,
    FlightsFormComponent,
    FlightsCalendarComponent,
    FlightComponent,
  ],
  imports: [CommonModule, BookingRoutingModule, SharedModule, ReactiveFormsModule],
})
export class BookingModule {}
