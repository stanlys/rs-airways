import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

@NgModule({
  exports: [MaterialModule, RouterModule, FormsModule],
})
export class SharedModule {}
