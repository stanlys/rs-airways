import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { AccountRoutingModule } from './account-routing.module';
import { AccountPageComponent } from './pages/account-page/account-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AccountPageComponent],
  imports: [CommonModule, AccountRoutingModule, SharedModule, TranslateModule],
})
export class AccountModule {}
