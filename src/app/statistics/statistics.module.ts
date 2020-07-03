import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamStatisticsDashboardComponent } from './stream-statistics-dashboard/stream-statistics-dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { StatisticsService } from '../service/statistics.service';
import { MomentModule } from 'ngx-moment';
import { NgxFilesizeModule } from 'ngx-filesize';
import { AccountStatisticsDashboardComponent } from './account-statistics-dashboard/account-statistics-dashboard.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, NgbModule, MomentModule, NgxFilesizeModule
  ],
  providers: [StatisticsService],
  declarations: [StreamStatisticsDashboardComponent, AccountStatisticsDashboardComponent],
  exports: [StreamStatisticsDashboardComponent, AccountStatisticsDashboardComponent]
})
export class StatisticsModule {}
