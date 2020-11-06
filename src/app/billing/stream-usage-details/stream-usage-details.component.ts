import { Component, Input, OnInit } from '@angular/core';
import {StreamIncomingStatistic, StreamStatistic} from '../../service/stream-statistical.service';

@Component({
  selector: 'app-stream-usage-details',
  templateUrl: './stream-usage-details.component.html',
  styleUrls: ['./stream-usage-details.component.css']
})
export class StreamUsageDetailsComponent implements OnInit {

  @Input() statistic: StreamStatistic;

  constructor() { }

  ngOnInit(): void {
  }

  getStreamingDuration() {
    return this.statistic.incoming
      .reduce((acc, val) => acc + val.duration, 0);
  }

  getIncomingUploadTotal() {
    return this.statistic.incoming
      .reduce((acc, val) => acc + val.upload, 0);
  }

  getIncomingDownloadTotal() {
    return this.statistic.incoming
      .reduce((acc, val) => acc + val.download, 0);
  }

  getOutgoingUploadTotal() {
    return this.statistic.outgoing
      .reduce((acc, val) => acc + val.upload, 0);
  }

  getOutgoingDownloadTotal() {
    return this.statistic.outgoing
      .reduce((acc, val) => acc + val.download, 0);
  }

}
