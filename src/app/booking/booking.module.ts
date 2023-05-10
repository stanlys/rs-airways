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
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { InformationAboutPassengerComponent } from './components/information-about-passenger/information-about-passenger.component';
import { SummaryPassengerCardComponent } from './components/summary-passenger-card/summary-passenger-card.component';
import { TotalPriceElementComponent } from './components/total-price-element/total-price-element.component';
import { TotalPriceComponent } from './components/total-price/total-price.component';
import { CurrencySymbolService } from './service/currency-symbol.service';

@NgModule({
  declarations: [
    BookingPageComponent,
    SummaryPageComponent,
    InformationAboutPassengerComponent,
    SummaryPassengerCardComponent,
    TotalPriceElementComponent,
    TotalPriceComponent,
    SecondMenuComponent,
    FlightsFormComponent,
    FlightsCalendarComponent,
    FlightComponent,
  ],
  imports: [CommonModule, BookingRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [CurrencySymbolService],
})
export class BookingModule {}
