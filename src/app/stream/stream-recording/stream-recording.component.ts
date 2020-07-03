import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileFormat, Recording, SourceType } from '../../service/recording.service';
import { Storage, StorageService } from '../../service/storage.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MediaType, StreamService, TrackInfo } from '../../service/stream.service';

@Component({
  selector: 'app-stream-recording',
  templateUrl: './stream-recording.component.html',
  styleUrls: ['./stream-recording.component.css']
})
export class StreamRecordingComponent implements OnInit {

  form: FormGroup;
  formTracks: FormArray;
  fileFormat = FileFormat;
  sourceType = SourceType;
  mediaType = MediaType;

  @Input() streamId: string;

  storages: Observable<Storage[]>;

  tracksData: TrackInfo[] = [];

  constructor(public activeModal: NgbActiveModal,
              private storageService: StorageService,
              private streamService: StreamService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    const captureSourceControl = this.fb.control(SourceType.Outgoing, [Validators.required]);
    captureSourceControl.valueChanges.subscribe((value: SourceType) => {
      if (value === SourceType.Incoming) {
        this.streamService.getIncomingTracksByStream(this.streamId)
          .subscribe(tracks => this.updateTracks(tracks));
      } else if (value === SourceType.Outgoing) {
        this.streamService.getOutgoingTracksByStream(this.streamId)
          .subscribe(tracks => this.updateTracks(tracks));
      }
    });
    this.formTracks = this.fb.array([]);
    const capture = this.fb.group({
      source: captureSourceControl,
      tracks: this.formTracks
    });

    this.form = this.fb.group({
      streamId: [this.streamId, [Validators.required, Validators.maxLength(255)]],
      fileName: [this.generateFileName(), [Validators.required, Validators.maxLength(255)]],
      fileFormat: [FileFormat.MKV, [Validators.required]],
      capture: capture,
      storageId: [null, [Validators.required]],
    });

    const compareString = (a: string, b: string) => {
      if (a < b) {
        return 1;
      } else if (a > b) {
        return -1;
      }
      return 0;
    };

    this.storages = this.storageService.list().pipe(tap(results => {
      results.sort((a, b) => compareString(a.name, b.name));
    }));

    this.streamService.getOutgoingTracksByStream(this.streamId)
      .subscribe(tracks => this.updateTracks(tracks));
  }

  getOutput() {
    if (this.form.valid) {
      return this.form.value as Recording;
    }
    return undefined;
  }

  onSubmit() {

  }

  onTrackCheckboxChange(event: Event) {
    const target = <HTMLInputElement>event.target;

    if (target.checked) {
      const track = this.tracksData.find(item => item.idx.toString() === target.value);
      if (track) {
        this.formTracks.push(new FormControl({ type: track.type, idx: track.idx }));
      }
    } else {
      let removed = false;
      this.formTracks.controls.forEach((control: FormControl, index: number) => {
        if (control.value.idx.toString() === target.value) {
          this.formTracks.removeAt(index);
          removed = true;
          return;
        }
      });

      if (!removed) {
        const tracks = this.tracksData.filter(item => item.idx.toString() !== target.value);
        for (const track of tracks) {
          this.formTracks.push(new FormControl({ type: track.type, idx: track.idx }));
        }
      }
    }
  }

  public getTracksByType(type: MediaType) {
    return this.tracksData.filter(item => item.type === type);
  }

  public getTrackCaption(track: TrackInfo) {
    const readableBitrate = (bytes: number) => {
      if (bytes === 0) {
        return '';
      }

      const i = Math.floor(Math.log(bytes) / Math.log(1000));
      const sizes = ['bps', 'kbps', 'mbps', 'gbps'];

      return (bytes / Math.pow(1000, i)).toFixed(1) + ' ' + sizes[i];
    };

    if (track.type === MediaType.Video) {
      return `${track.codec} ${track.width}x${track.height} ${readableBitrate(track.bps * 8)}`;
    }

    if (track.type === MediaType.Audio) {
      return `${track.codec} ${track.channels}ch ${track.rate}Hz ${readableBitrate(track.bps * 8)}`;
    }

    return '';
  }

  private updateTracks(tracks: TrackInfo[]) {
    this.tracksData = tracks;
    this.formTracks.clear();
  }

  private generateFileName() {
    return `${this.streamId}-${(new Date()).toISOString()}`;
  }
}
