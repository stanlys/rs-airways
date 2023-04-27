import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MainFormComponent } from './components/main-form/main-form.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AirportFieldComponent } from './components/airport-field/airport-field.component';
import { DatesFieldComponent } from './components/dates-field/dates-field.component';
import { PassengersFieldComponent } from './components/passengers-field/passengers-field.component';
import { CustomNumberInputComponent } from './components/custom-number-input/custom-number-input.component';

@NgModule({
  declarations: [MainPageComponent, MainFormComponent, AirportFieldComponent, DatesFieldComponent, PassengersFieldComponent, CustomNumberInputComponent],
  imports: [CommonModule, MainRoutingModule, MaterialModule, SharedModule],
})
export class MainModule {}
