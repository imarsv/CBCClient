import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputStreamComponent } from './input-stream/input-stream.component';
import { OutputStreamComponent } from './output-stream/output-stream.component';
import { StreamsViewComponent } from './streams-view/streams-view.component';
import { StreamService } from '../service/stream.service';
import { RouterModule } from '@angular/router';
import { StreamDashboardComponent } from './stream-dashboard/stream-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OutputStreamConnectionComponent } from './output-stream-connection/output-stream-connection.component';

@NgModule({
  imports: [
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NgbModule,
  ],
  providers: [StreamService],
  entryComponents: [InputStreamComponent, OutputStreamComponent, OutputStreamConnectionComponent],
  declarations: [
    InputStreamComponent,
    OutputStreamComponent,
    StreamsViewComponent,
    StreamDashboardComponent,
    OutputStreamConnectionComponent
  ],
  exports: [StreamDashboardComponent]
})
export class StreamModule {}
