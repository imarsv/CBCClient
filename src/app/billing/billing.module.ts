import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';
import { NgxFilesizeModule } from 'ngx-filesize';
import { StreamStatisticalService } from '../service/stream-statistical.service';
import { InvoicePrintComponent } from './invoice-print/invoice-print.component';
import { AccountBillDashboardComponent } from './account-bill-dashboard/account-bill-dashboard.component';
import { StreamBillDashboardComponent } from './stream-bill-dashboard/stream-bill-dashboard.component';
import { StreamUsageDetailsComponent } from './stream-usage-details/stream-usage-details.component';
import { AccountService } from '../service/account.service';

@NgModule({
  imports: [
    CommonModule, FormsModule, NgbModule, MomentModule, NgxFilesizeModule,
  ],
  providers: [StreamStatisticalService, AccountService],
  declarations: [InvoicePrintComponent, AccountBillDashboardComponent, StreamBillDashboardComponent, StreamUsageDetailsComponent],
  exports: [AccountBillDashboardComponent, StreamBillDashboardComponent]
})
export class BillingModule {}
