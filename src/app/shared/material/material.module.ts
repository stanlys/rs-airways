import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  exports: [
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatCommonModule,
    MatMenuModule,
    MatSelectModule,
  ],
})
export class MaterialModule {}
