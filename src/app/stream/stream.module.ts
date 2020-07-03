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
import { ClipboardService } from '../service/clipboard.service';
import { TranscodeDashboardComponent } from './transcode-dashboard/transcode-dashboard.component';
import { TranscodeTrackViewComponent } from './transcode-track-view/transcode-track-view.component';
import { StreamRecordingComponent } from './stream-recording/stream-recording.component';
import { RecordingService } from '../service/recording.service';
import { MomentModule } from 'ngx-moment';
import { StreamRecordingInfoComponent } from './stream-recording-info/stream-recording-info.component';
import { NgxFilesizeModule } from 'ngx-filesize';

@NgModule({
  imports: [
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NgbModule, MomentModule, NgxFilesizeModule,
  ],
  providers: [RecordingService, StreamService, ClipboardService],
  entryComponents: [InputStreamComponent, OutputStreamComponent, OutputStreamConnectionComponent, TranscodeTrackViewComponent],
  declarations: [
    InputStreamComponent,
    OutputStreamComponent,
    StreamsViewComponent,
    StreamDashboardComponent,
    OutputStreamConnectionComponent,
    TranscodeDashboardComponent,
    TranscodeTrackViewComponent,
    StreamRecordingComponent,
    StreamRecordingInfoComponent
  ],
  exports: [StreamDashboardComponent, TranscodeDashboardComponent]
})
export class StreamModule {
}
