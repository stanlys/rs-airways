import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { MainFormComponent } from './components/main-form/main-form.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MainPageComponent, MainFormComponent],
  imports: [CommonModule, MainRoutingModule, MaterialModule, SharedModule],
})
export class MainModule {}
