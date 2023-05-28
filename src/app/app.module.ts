import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeEn from '@angular/common/locales/en';
import localeDeExtra from '@angular/common/locales/extra/de';
import localePlExtra from '@angular/common/locales/extra/pl';
import localeRuExtra from '@angular/common/locales/extra/ru';
import localePl from '@angular/common/locales/pl';
import localeRu from '@angular/common/locales/ru';
import { NgModule, isDevMode } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../enviroments/enviroment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { metaReducers, reducers } from './store/index';

registerLocaleData(localeEn, 'en');
registerLocaleData(localeRu, 'ru', localeRuExtra);
registerLocaleData(localePl, 'pl', localePlExtra);
registerLocaleData(localeDe, 'de', localeDeExtra);

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 100, logOnly: !isDevMode() }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'en',
    }),

    AngularFireModule.initializeApp(environment),
    AngularFireAuthModule,
  ],
  exports: [],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
