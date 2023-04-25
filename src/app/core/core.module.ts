import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { CurrencyMenuComponent } from './components/header/currency-menu/currency-menu.component';
import { DateFormatSelectorComponent } from './components/header/date-format-selector/date-format-selector.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/header/cart/cart.component';
import { SignInComponent } from './components/header/sign-in/sign-in.component';
import { BookingComponent } from './components/header/booking/booking.component';
import { ProgressIndicatorComponent } from './components/header/progress-indicator/progress-indicator.component';
import { AccountComponent } from './components/account/account.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CurrencyMenuComponent,
    DateFormatSelectorComponent,
    SignInComponent,
    CartComponent,
    BookingComponent,
    ProgressIndicatorComponent,
    AccountComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
