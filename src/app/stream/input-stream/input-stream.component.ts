import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AccessMode, GeoLocation, Input, InputStreamer, Output, StreamFormat} from '../../service/stream.service';

export enum OutputMode {
  Passthrough = 'Passthrough',
  // StaticTranscode = 'StaticTranscode', // Deprecated
  AdjustableTranscode = 'AdjustableTranscode',
}

@Component({
  selector: 'app-input-stream',
  templateUrl: './input-stream.component.html',
  styleUrls: ['./input-stream.component.css']
})
export class InputStreamComponent implements OnInit {

  streamFormat = StreamFormat;
  accessMode = AccessMode;
  outputMode = OutputMode;

  format: StreamFormat = StreamFormat.WebRTC;
  output = OutputMode.Passthrough;

  ipAddress?: string;
  latitude?: number;
  longitude?: number;

  callbackUri?: string;

  access = AccessMode.Public;
  accessToken?: string;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  getInput() {
    const input = new Input();
    input.format = this.format;

    const output = new Output();
    if (this.output === OutputMode.Passthrough) {
      output.passthrough = true;
    } else if (this.output === OutputMode.AdjustableTranscode) {
      output.passthrough = false;
      output.tracks = [];
    }
    input.output = output;

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

    input.access = this.access;
    if (this.accessToken && (input.access === AccessMode.Private)) {
      input.accessToken = this.accessToken;
    }

    return input;
  }
}
