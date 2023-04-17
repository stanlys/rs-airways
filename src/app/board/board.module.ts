import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BoardRoutingModule } from './board-routing.module';
import { BoardPageComponent } from './pages/board-page/board-page.component';

@NgModule({
  declarations: [BoardPageComponent],
  imports: [CommonModule, BoardRoutingModule],
})
export class BoardModule {}
