import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AccessMode,
  HttpConnection,
  InputEndpoint,
  InputStatus,
  OutputEndpoint,
  StreamFormat,
  StreamService,
  WebRTCConnection
} from '../../service/stream.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OutputStreamComponent } from '../output-stream/output-stream.component';
import { OutputStreamConnectionComponent } from '../output-stream-connection/output-stream-connection.component';
import { ClipboardService } from '../../service/clipboard.service';
import { Observable } from 'rxjs';
import { StreamRecordingComponent } from '../stream-recording/stream-recording.component';
import { Recording, RecordingService, RecordingState } from '../../service/recording.service';
import { StreamRecordingInfoComponent } from '../stream-recording-info/stream-recording-info.component';

@Component({
  selector: 'app-stream-dashboard',
  templateUrl: './stream-dashboard.component.html',
  styleUrls: ['./stream-dashboard.component.css']
})
export class StreamDashboardComponent implements OnInit, OnDestroy {
  // Enums
  streamFormat = StreamFormat;
  accessMode = AccessMode;
  inputStatus = InputStatus;
  recordingState = RecordingState;

  // Data
  stream?: InputEndpoint;
  outputs: Observable<OutputEndpoint[]>;
  recordings: Observable<Recording[]>;

  private refreshTimer = null;

  private readonly id: string;

  constructor(private streamService: StreamService,
              private recordingService: RecordingService,
              private clipboardService: ClipboardService,
              private modalService: NgbModal,
              private router: Router, private activatedRoute: ActivatedRoute) {

    this.id = activatedRoute.snapshot.params['id'] || 'none';
  }

  ngOnInit() {
    this.loadStream();
    this.loadOutputs();
    this.loadRecordings();
  }

  ngOnDestroy(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }
  }

  getConnectionURI() {
    if (this.stream.format === StreamFormat.WebRTC) {
      return (this.stream.connection as WebRTCConnection).signallingUri;
    } else {
      return (this.stream.connection as HttpConnection).uri;
    }
  }

  getPushPageURI() {
    const hostname = this.getHostname();
    const streamId = this.getStreamId();

    let uri = `https://${hostname}/push.html?stream=${streamId}`;
    if (this.stream.accessToken) {
      uri += '&token=' + this.stream.accessToken;
    }

    return uri;
  }

  getPlaybackPageURI(token?: string) {
    const hostname = this.getHostname();
    let streamId = this.getStreamId();

    const streamIdParts = streamId.split('+');
    if (streamIdParts.length === 2) {
      let prefix = streamIdParts[0];
      if (prefix === 'in') {
        prefix = 'out';
      }
      streamId = `${prefix}+${streamIdParts[1]}`;
    }

    let uri = `https://${hostname}/play.html?stream=${streamId}`;
    if (token) {
      uri += `&token=${token}`;
    }

    return uri;
  }

  getStreamId() {
    const uri = this.getConnectionURI();
    if (uri) {
      const index = uri.lastIndexOf('/');
      if (index !== -1) {
        return uri.substr(index + 1);
      }
    }
  }

  copy(value: string) {
    this.clipboardService.copy(value);
  }

  async output() {
    const outputStreamModal = this.modalService.open(OutputStreamComponent);
    outputStreamModal.componentInstance.access = this.stream.access;

    try {
      const output = await outputStreamModal.result;
      if (output) {
        output.streamId = this.stream.id;
        try {
          const outputEndpoint = await this.streamService.output(output).toPromise();

          this.loadOutputs();

          const outputStreamConnectionModal = this.modalService.open(OutputStreamConnectionComponent, { size: 'lg' });
          outputStreamConnectionModal.componentInstance.format = output.format;
          outputStreamConnectionModal.componentInstance.endpoint = outputEndpoint;
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
    }
  }

  clearSessions(outputId: string) {
    this.streamService.clearSessions(outputId).subscribe(
      () => this.loadOutputs(),
      error => alert(error?.error?.message ? error.error.message : 'Something wrong with sessions cleanup'));
  }

  deleteOutput(outputId: string) {
    this.streamService.deleteOutput(outputId).subscribe(
      () => this.loadOutputs(),
      error => alert(error?.error?.message ? error.error.message : 'Something wrong with output delete'));
  }

  delete() {
    if (this.stream.id) {
      this.streamService.delete(this.stream.id);
      this.router.navigateByUrl('/streams');
    }
  }

  isAdjustableTranscode() {
    return this.getStreamId()
      .startsWith('in+');
  }

  async recordingStart() {
    const modal = this.modalService.open(StreamRecordingComponent, { size: 'lg' });
    modal.componentInstance.streamId = this.stream.id;

    try {
      const recording = await modal.result;
      if (recording) {
        this.recordingService.add(recording).subscribe(
          () => this.loadRecordings(),
          error => alert(error?.error?.message ? error.error.message : 'Something wrong with recording start'));
      }
    } catch (e) {
    }
  }

  recordingStop(id: string) {
    this.recordingService.stop(id).subscribe(
      () => this.loadRecordings(),
      error => alert(error?.error?.message ? error.error.message : 'Something wrong with recording stop')
    );
  }

  recordingInfo(id: any) {
    const modal = this.modalService.open(StreamRecordingInfoComponent, { scrollable: true });
    modal.componentInstance.streamId = id;
  }

  recordingDelete(id: string) {
    this.recordingService.delete(id).subscribe(
      () => this.loadRecordings(),
      error => alert(error?.error?.message ? error.error.message : 'Something wrong with recording delete')
    );
  }

  private loadStream() {
    this.streamService.get(this.id)
      .subscribe(item => {
          this.stream = item;

          this.refreshTimer = setTimeout(() => {
            this.loadAll();
          }, 5000);
        },
        error => alert(error?.error?.message ? error.error.message : 'Something wrong with stream loading')
      );
  }

  private loadOutputs() {
    this.outputs = this.streamService.listOutputsByStream(this.id);
  }

  private loadRecordings() {
    this.recordings = this.recordingService.listByStream(this.id);
  }

  private loadAll() {
    this.loadStream();
    this.loadOutputs();
    this.loadRecordings();
  }

  private getHostname() {
    const uri = this.getConnectionURI();
    if (uri) {
      const match = uri.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
      if (match && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        return match[2];
      }
    }
  }
}
