import { Component, Input, OnInit } from '@angular/core';
import { HttpConnection, OutputEndpoint, StreamFormat, WebRTCConnection } from '../../service/stream.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardService } from '../../service/clipboard.service';

@Component({
  selector: 'app-output-stream-connection',
  templateUrl: './output-stream-connection.component.html',
  styleUrls: ['./output-stream-connection.component.css']
})
export class OutputStreamConnectionComponent implements OnInit {

  @Input() format: StreamFormat;
  @Input() endpoint: OutputEndpoint;
  @Input() viewerId?: string;

  streamFormat = StreamFormat;

  constructor(public activeModal: NgbActiveModal, private clipboardService: ClipboardService) {
  }

  ngOnInit() {
  }

  getHttpConnection(): HttpConnection {
    return this.endpoint.connection as HttpConnection;
  }

  getWebRTCConnection(): WebRTCConnection {
    return (this.endpoint.connection as WebRTCConnection);
  }

  copy(value: string) {
    this.clipboardService.copy(value);
  }
}
