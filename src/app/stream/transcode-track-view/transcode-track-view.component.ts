import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CodecType, EncoderSettingsH264, SpeedPresetH264, Track} from '../../service/stream.service';

@Component({
  selector: 'app-transcode-track-view',
  templateUrl: './transcode-track-view.component.html',
  styleUrls: ['./transcode-track-view.component.css']
})
export class TranscodeTrackViewComponent implements OnInit {

  @Input() track: Track;
  @Input() edit: boolean;

  codecType = CodecType;
  seedPresetH264 = SpeedPresetH264;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  asEncoderSettingsH264(track: Track): EncoderSettingsH264 {
    return track.settings as EncoderSettingsH264;
  }

  isEnabled() {
    const exists = this.track.width && this.track.height;
    const empty = !this.track.width && !this.track.height;
    return !(exists || empty);
  }

  getTrack() {
    return this.track;
  }
}
