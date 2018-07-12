import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GeoLocation, Input, InputStreamer, Output, StreamFormat } from '../../service/stream.service';

@Component({
  selector: 'app-input-stream',
  templateUrl: './input-stream.component.html',
  styleUrls: ['./input-stream.component.css']
})
export class InputStreamComponent implements OnInit {

  streamFormat = StreamFormat;

  format: StreamFormat = StreamFormat.RTMP;
  transcode = false;

  ipAddress?: string;

  latitude?: number;
  longitude?: number;

  callbackUri?: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  getInput() {
    const input = new Input();
    input.format = this.format;
    input.output = new Output(!this.transcode);

    if (this.ipAddress || (this.latitude && this.longitude)) {
      const streamer = new InputStreamer();

      if (this.ipAddress) {
        streamer.ipAddress = this.ipAddress;
      }

      if (this.latitude && this.longitude) {
        streamer.geoLocation = new GeoLocation(this.longitude, this.latitude);
      }

      input.streamer = streamer;
    }

    if (this.callbackUri) {
      input.callbackUri = this.callbackUri;
    }

    return input;
  }
}
