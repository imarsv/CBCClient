import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsViewComponent } from './accounts-view/accounts-view.component';
import { AccountService } from '../service/account.service';
import { RouterModule } from '@angular/router';
import { AccountEditComponent } from './account-edit/account-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule,
  ],
  providers: [AccountService],
  declarations: [AccountsViewComponent, AccountEditComponent],
  entryComponents: [AccountEditComponent],
  exports: [AccountsViewComponent]
})
export class AccountModule {}
