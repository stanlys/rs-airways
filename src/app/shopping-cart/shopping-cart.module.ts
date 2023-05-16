import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { CartComponent } from './cart/cart.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, ShoppingCartRoutingModule, SharedModule, MaterialModule, FormsModule],
})
export class ShoppingCartModule {}
