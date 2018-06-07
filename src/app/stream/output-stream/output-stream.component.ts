import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GeoLocation, StreamFormat, StreamOutput, StreamViewer } from '../../service/stream.service';

@Component({
  selector: 'app-output-stream',
  templateUrl: './output-stream.component.html',
  styleUrls: ['./output-stream.component.css']
})
export class OutputStreamComponent implements OnInit {

  streamFormat = StreamFormat;

  format: StreamFormat = StreamFormat.RTMP;

  ipAddress?: string;

  latitude?: number;
  longitude?: number;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  getOutput() {
    const output = new StreamOutput();

    output.format = this.format;

    if (this.ipAddress || (this.latitude && this.longitude)) {
      const viewer = new StreamViewer();

      if (this.ipAddress) {
        viewer.ipAddress = this.ipAddress;
      }

      if (this.latitude && this.longitude) {
        viewer.geoLocation = new GeoLocation(this.longitude, this.latitude);
      }

      output.viewer = viewer;
    }

    return output;
  }
}
