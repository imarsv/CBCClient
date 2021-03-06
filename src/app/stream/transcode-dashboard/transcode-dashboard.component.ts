import { Component, OnInit } from '@angular/core';
import {
  CodecType,
  EncoderSettingsH264,
  EncoderSettingsVP8,
  MediaType,
  Output,
  Overlay,
  SpeedPresetH264,
  StreamService,
  Track
} from '../../service/stream.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { TranscodeTrackViewComponent } from '../transcode-track-view/transcode-track-view.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transcode-dashboard',
  templateUrl: './transcode-dashboard.component.html',
  styleUrls: ['./transcode-dashboard.component.css']
})
export class TranscodeDashboardComponent implements OnInit {

  hasOutput?: Output;

  streamId: string;

  overlay = this.emptyOverlay();
  tracks: Track[] = [];

  constructor(private streamService: StreamService,
              private modalService: NgbModal,
              private router: Router, private activatedRoute: ActivatedRoute) {

    this.streamId = activatedRoute.snapshot.params['id'];

    this.streamService.getTranscode(this.streamId)
      .subscribe(item => this.loadOutput(item));
  }

  loadOutput(output: Output) {
    this.overlay = this.emptyOverlay();
    if (output.overlay) {
      this.overlay = output.overlay;
    }

    this.tracks = [];
    if (output.tracks) {
      this.tracks = output.tracks;
    }

    this.hasOutput = output;
  }

  ngOnInit() {
  }

  overlayChangeEvent(input: any) {
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
              this.overlay.data = fileResult;
            }
          };
        }
      };

      fileReader.readAsDataURL(input.target.files[0]);

      input.target.value = null;
    }
  }

  clearOverlay() {
    this.overlay = new Overlay('', 0, 0);
  }

  async appendTrack() {
    const ngbModal = this.modalService.open(TranscodeTrackViewComponent, { backdrop: 'static' });
    ngbModal.componentInstance.track = this.emptyTrack();
    ngbModal.componentInstance.edit = false;

    try {
      const track = await ngbModal.result;
      if (track) {
        this.tracks.push(track);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async editTrack(track: Track) {
    const ngbModal = this.modalService.open(TranscodeTrackViewComponent, { backdrop: 'static' });
    ngbModal.componentInstance.track = JSON.parse(JSON.stringify(track));
    ngbModal.componentInstance.edit = true;

    try {
      const updatedTrack = await ngbModal.result;
      if (updatedTrack) {
        const trackIndex = this.tracks.indexOf(track);
        this.tracks[trackIndex] = updatedTrack;
      }
    } catch (e) {
      console.error(e);
    }
  }

  removeTrack(track: Track) {
    this.tracks.splice(this.tracks.indexOf(track), 1);
  }

  getEncodingDescription(track: Track) {
    if (track.settings.codec === CodecType.H264) {
      const settings = <EncoderSettingsH264>track.settings;
      return `Preset: ${settings.speedPreset}, Key-int: ${settings.keyIntMax}`;
    } else if (track.settings.codec === CodecType.VP8) {
      const settings = <EncoderSettingsVP8>track.settings;
      return `Key-int: ${settings.keyMaxDist}`;
    }

    return '';
  }

  save() {
    const output = new Output();
    output.passthrough = false;
    if (this.overlay.data.length > 0) {
      output.overlay = this.overlay;
    }
    output.tracks = this.tracks;

    this.streamService.updateTranscode(this.streamId, output)
      .subscribe(
        item => this.loadOutput(item),
        (error: HttpErrorResponse) => {
          if (error.status === 400) {
            if (error.error.message) {
              alert(error.error.message);
            }
          }
        });
  }

  emptyOverlay() {
    return new Overlay('', 0, 0);
  }

  emptyTrack() {
    const settings = new EncoderSettingsH264();
    settings.codec = CodecType.H264;
    settings.bitrate = 2000;
    settings.speedPreset = SpeedPresetH264.Superfast;
    settings.keyIntMax = 0;

    const track = new Track();
    track.type = MediaType.Video;
    track.settings = settings;

    return track;
  }
}
