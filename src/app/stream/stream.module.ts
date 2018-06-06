import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputStreamComponent } from './input-stream/input-stream.component';
import { OutputStreamComponent } from './output-stream/output-stream.component';
import { StreamsViewComponent } from './streams-view/streams-view.component';
import { StreamService } from '../service/stream.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [StreamService],
  declarations: [InputStreamComponent, OutputStreamComponent, StreamsViewComponent],
  exports: [InputStreamComponent]
})
export class StreamModule {}
