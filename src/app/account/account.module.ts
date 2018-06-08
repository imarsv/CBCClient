import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsViewComponent } from './accounts-view/accounts-view.component';
import { AccountService } from '../service/account.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule, RouterModule,
  ],
  providers: [AccountService],
  declarations: [AccountsViewComponent],
  exports: [AccountsViewComponent]
})
export class AccountModule {}
