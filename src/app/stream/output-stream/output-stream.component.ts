import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AccessMode, GeoLocation, StreamFormat, StreamOutput, StreamViewer} from '../../service/stream.service';

@Component({
  selector: 'app-output-stream',
  templateUrl: './output-stream.component.html',
  styleUrls: ['./output-stream.component.css']
})
export class OutputStreamComponent implements OnInit {

  @Input() access: AccessMode;

  accessMode = AccessMode;
  streamFormat = StreamFormat;

  format: StreamFormat = StreamFormat.RTMP;

  ipAddress?: string;

  latitude?: number;
  longitude?: number;

  callbackUri?: string;
  accessToken?: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  getOutput() {
    const output = new StreamOutput();

    output.format = this.format;

    if (this.ipAddress || (this.latitude && this.longitude) || this.accessToken) {
      const viewer = new StreamViewer();

      if (this.ipAddress) {
        viewer.ipAddress = this.ipAddress;
      }

      if (this.latitude && this.longitude) {
        viewer.geoLocation = new GeoLocation(this.longitude, this.latitude);
      }

      if (this.accessToken) {
        viewer.accessToken = this.accessToken;
      }

      output.viewer = viewer;
    }

    if (this.callbackUri) {
      output.callbackUri = this.callbackUri;
    }

    return output;
  }
}
