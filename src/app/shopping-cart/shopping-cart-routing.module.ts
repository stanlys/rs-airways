import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { UserAccountComponent } from './user-account/user-account.component';

const routes: Routes = [
  { path: '', component: CartComponent },
  { path: 'user', pathMatch: 'full', component: UserAccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingCartRoutingModule {}
