import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamStatisticsDashboardComponent } from './stream-statistics-dashboard/stream-statistics-dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { StatisticsService } from '../service/statistics.service';
import { MomentModule } from 'ngx-moment';
import { FileSizeModule } from 'ngx-filesize';

@NgModule({
  imports: [
    CommonModule, FormsModule, NgbModule, MomentModule, FileSizeModule
  ],
  providers: [StatisticsService],
  declarations: [StreamStatisticsDashboardComponent],
  exports: [StreamStatisticsDashboardComponent]
})
export class StatisticsModule {}
