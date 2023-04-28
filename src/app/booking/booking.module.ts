import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BookingPageComponent],
  imports: [CommonModule, BookingRoutingModule, SharedModule],
})
export class BookingModule {}
