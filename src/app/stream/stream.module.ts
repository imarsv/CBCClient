import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputStreamComponent} from './input-stream/input-stream.component';
import {OutputStreamComponent} from './output-stream/output-stream.component';
import {StreamsViewComponent} from './streams-view/streams-view.component';
import {StreamService} from '../service/stream.service';
import {RouterModule} from '@angular/router';
import {StreamDashboardComponent} from './stream-dashboard/stream-dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OutputStreamConnectionComponent} from './output-stream-connection/output-stream-connection.component';
import {ClipboardService} from '../service/clipboard.service';
import {TranscodeDashboardComponent} from './transcode-dashboard/transcode-dashboard.component';
import {TranscodeTrackViewComponent} from './transcode-track-view/transcode-track-view.component';

@NgModule({
  imports: [
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule, NgbModule,
  ],
  providers: [StreamService, ClipboardService],
  entryComponents: [InputStreamComponent, OutputStreamComponent, OutputStreamConnectionComponent, TranscodeTrackViewComponent],
  declarations: [
    InputStreamComponent,
    OutputStreamComponent,
    StreamsViewComponent,
    StreamDashboardComponent,
    OutputStreamConnectionComponent,
    TranscodeDashboardComponent,
    TranscodeTrackViewComponent
  ],
  exports: [StreamDashboardComponent, TranscodeDashboardComponent]
})
export class StreamModule {
}
