import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AccountPageComponent],
  imports: [CommonModule, AccountRoutingModule, SharedModule],
})
export class AccountModule {}