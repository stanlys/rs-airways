import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../shared/shared.module';
import { BookingRoutingModule } from './booking-routing.module';
import { FlightsCalendarDateComponent } from './components/flights-calendar-date/flights-calendar-date.component';
import { FlightsCalendarDestinationComponent } from './components/flights-calendar-destination/flights-calendar-destination.component';
import { FlightsCalendarComponent } from './components/flights-calendar/flights-calendar.component';
import { FlightDetailsComponent } from './components/flights-flight-details/flight-details.component';
import { FlightSelectComponent } from './components/flights-flight-select/flight-select.component';
import { FlightComponent } from './components/flights-flight/flight.component';
import { FlightsFormComponent } from './components/flights-form/flights-form.component';
import { SecondMenuComponent } from './components/flights-second-menu/second-menu.component';
import { FlightsComponent } from './components/flights/flights.component';
import { InformationAboutPassengerComponent } from './components/summary-information-about-passenger/information-about-passenger.component';
import { SummaryPassengerCardComponent } from './components/summary-passenger-card/summary-passenger-card.component';
import { TotalPriceElementComponent } from './components/summary-total-price-element/total-price-element.component';
import { TotalPriceComponent } from './components/summary-total-price/total-price.component';
import { SeatsColorDirective } from './directives/seats-color.directive';
import { FlightsPageComponent } from './pages/flights-page/flights-page.component';
import { ProcessPageComponent } from './pages/process-page/process-page.component';
import { SummaryPageComponent } from './pages/summary-page/summary-page.component';
import { FindFlightPipe } from './pipes/find-flight.pipe';
import { FlightTimePipe } from './pipes/flight-time.pipe';
import { CurrencySymbolService } from './services/currency-symbol.service';
import { ProgressControlsComponent } from './components/progress-controls/progress-controls.component';

@NgModule({
  declarations: [
    SummaryPageComponent,
    InformationAboutPassengerComponent,
    SummaryPassengerCardComponent,
    TotalPriceElementComponent,
    TotalPriceComponent,
    SecondMenuComponent,
    FlightsFormComponent,
    FlightsCalendarComponent,
    FlightComponent,
    SeatsColorDirective,
    FlightSelectComponent,
    FlightDetailsComponent,
    FlightTimePipe,
    FindFlightPipe,
    FlightsCalendarDateComponent,
    FlightsCalendarDestinationComponent,
    FlightsComponent,
    ProcessPageComponent,
    FlightsPageComponent,
    ProgressControlsComponent,
  ],
  imports: [CommonModule, BookingRoutingModule, SharedModule, TranslateModule, ReactiveFormsModule],
  providers: [CurrencySymbolService],
})
export class BookingModule {}
