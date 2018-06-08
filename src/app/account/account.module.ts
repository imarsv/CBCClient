import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsViewComponent } from './accounts-view/accounts-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AccountsViewComponent],
  exports: [AccountsViewComponent]
})
export class AccountModule { }
