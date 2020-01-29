import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AccessMode, GeoLocation, Input, InputStreamer, Output, Overlay, StreamFormat} from '../../service/stream.service';

export enum OutputMode {
  Passthrough = 'Passthrough',
  Overlay = 'Overlay',
  Transcode = 'transcode'
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

  format: StreamFormat = StreamFormat.RTMP;
  output = OutputMode.Passthrough;

  ipAddress?: string;
  latitude?: number;
  longitude?: number;

  callbackUri?: string;

  access = AccessMode.Public;
  accessToken?: string;

  logoImageBase64: string;
  offsetX?: number;
  offsetY?: number;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  logoChangeEvent(input: any) {
    if (input.target.files && input.target.files[0]) {
      // Size Filter Bytes
      const max_size = 1024 * 1024;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 360;
      const max_width = 360;

      console.log(`Logo size ${input.target.files[0].size} bytes`);
      if (input.target.files[0].size > max_size) {
        alert(`Maximum size allowed is ${max_size / (1024 * 1024)} Mb`);
        return false;
      }

      console.log(`Logo type ${input.target.files[0].type}`);
      if (!allowed_types.includes(input.target.files[0].type)) {
        alert(`Only Images are allowed ( JPG | PNG )`);
        return false;
      }

      const fileReader = new FileReader();
      fileReader.onload = fev => {
        const fileResult = fileReader.result;
        if (fileResult && (typeof fileResult === 'string')) {
          const image = new Image();
          image.src = fileResult;
          image.onload = iev => {
            const height = iev.currentTarget['height'];
            const width = iev.currentTarget['width'];

            console.log(`Logo dimensions ${height}x${width}`);

            if ((height > max_height) && (width > max_width)) {
              alert(`Maximum dimensions allowed ${max_height}x${max_width} px`);
              return false;
            } else {
              this.logoImageBase64 = fileResult;
            }
          };
        }
      };

      fileReader.readAsDataURL(input.target.files[0]);
    }
  }

  getInput() {
    const input = new Input();
    input.format = this.format;

    const output = new Output();
    if (this.output === OutputMode.Passthrough) {
      output.passthrough = true;
    } else if (this.output === OutputMode.Overlay) {
      output.passthrough = false;
      output.overlay = new Overlay(this.logoImageBase64, this.offsetX, this.offsetY);
    } else {
      output.passthrough = false;
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
