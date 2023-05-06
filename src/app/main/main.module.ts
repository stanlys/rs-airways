import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MainFormComponent } from './components/main-form/main-form.component';
import { FlightRouteComponent } from './components/flight-route/flight-route.component';

@NgModule({
  declarations: [MainPageComponent, MainFormComponent, FlightRouteComponent],
  imports: [CommonModule, MainRoutingModule, MaterialModule, SharedModule, ReactiveFormsModule],
})
export class MainModule {}
