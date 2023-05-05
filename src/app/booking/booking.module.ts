import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BookingRoutingModule } from './booking-routing.module';
import { SecondMenuComponent } from './components/second-menu/second-menu.component';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';

@NgModule({
  declarations: [BookingPageComponent, SecondMenuComponent],
  imports: [CommonModule, BookingRoutingModule, SharedModule],
})
export class BookingModule {}
