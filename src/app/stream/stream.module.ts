import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputStreamComponent } from './input-stream/input-stream.component';
import { OutputStreamComponent } from './output-stream/output-stream.component';
import { StreamsViewComponent } from './streams-view/streams-view.component';
import { StreamService } from '../service/stream.service';
import { RouterModule } from '@angular/router';
import { StreamDashboardComponent } from './stream-dashboard/stream-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule,
  ],
  providers: [StreamService],
  declarations: [InputStreamComponent, OutputStreamComponent, StreamsViewComponent, StreamDashboardComponent],
  exports: [InputStreamComponent, StreamDashboardComponent]
})
export class StreamModule {}
