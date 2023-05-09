import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslatePipe } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './components/auth/auth.component';
import { LoginTabComponent } from './components/auth/login-tab/login-tab.component';
import { SignupTabComponent } from './components/auth/signup-tab/signup-tab.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccountComponent } from './components/header/account/account.component';
import { BookingComponent } from './components/header/booking/booking.component';
import { CartComponent } from './components/header/cart/cart.component';
import { CurrencyMenuComponent } from './components/header/currency-menu/currency-menu.component';
import { DateFormatSelectorComponent } from './components/header/date-format-selector/date-format-selector.component';
import { HeaderComponent } from './components/header/header.component';
import { ProgressIndicatorComponent } from './components/header/progress-indicator/progress-indicator.component';
import { SignInComponent } from './components/header/sign-in/sign-in.component';
import { ChangeLanguageComponent } from './components/header/change-language/change-language.component';

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
    AuthComponent,
    LoginTabComponent,
    SignupTabComponent,
    ChangeLanguageComponent,
  ],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, TranslateModule],
  providers: [TranslatePipe],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
