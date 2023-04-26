import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatCommonModule,
    MatMenuModule,
    MatSelectModule,
    MatStepperModule,
    MatTabsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
})
export class MaterialModule {}
