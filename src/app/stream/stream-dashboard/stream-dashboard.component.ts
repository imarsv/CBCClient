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
import { SnapshotService, StreamSnapshot } from '../../service/snapshot.service';
import { SourceType } from '../../service/common/source-type.enum';
import { StreamSnapshotComponent } from '../stream-snapshot/stream-snapshot.component';

@Component({
  selector: 'app-stream-dashboard',
  templateUrl: './stream-dashboard.component.html',
  styleUrls: ['./stream-dashboard.component.css']
})
export class StreamDashboardComponent implements OnInit, OnDestroy {
  // Enums
  streamFormat = StreamFormat;
  inputStatus = InputStatus;
  accessMode = AccessMode;
  recordingState = RecordingState;

  // Data
  stream?: InputEndpoint;
  outputs: Observable<OutputEndpoint[]>;
  recordings: Observable<Recording[]>;

  incomingSnapshotSettings: StreamSnapshot = null;
  incomingSnapshotSrc: string;
  incomingSnapshotRefreshTimer = null;
  outgoingSnapshotSettings: StreamSnapshot = null;
  outgoingSnapshotSrc: string;
  outgoingSnapshotRefreshTimer = null;

  private refreshTimer = null;

  private readonly id: string;

  constructor(private streamService: StreamService,
              private recordingService: RecordingService,
              private snapshotService: SnapshotService,
              private clipboardService: ClipboardService,
              private modalService: NgbModal,
              private router: Router, private activatedRoute: ActivatedRoute) {

    this.id = activatedRoute.snapshot.params['id'] || 'none';
  }

  ngOnInit() {
    this.loadStream();
    this.loadOutputs();
    this.loadRecordings();
    this.loadSnapshotSettings();
  }

  ngOnDestroy(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }

    this.stopIncomingSnapshotPreviewMonitoring();
    this.stopOutgoingSnapshotPreviewMonitoring();
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
    const streamId = this.getStreamName();

    let uri = `https://${hostname}/push.html?stream=${streamId}`;
    if (this.stream.accessToken) {
      uri += '&token=' + this.stream.accessToken;
    }

    return uri;
  }

  getPlaybackPageURI(token?: string) {
    const hostname = this.getHostname();
    let streamName = this.getStreamName();

    const streamIdParts = streamName.split('+');
    if (streamIdParts.length === 2) {
      let prefix = streamIdParts[0];
      if (prefix === 'in') {
        prefix = 'out';
      }
      streamName = `${prefix}+${streamIdParts[1]}`;
    }

    let uri = `https://${hostname}/play.html?stream=${streamName}`;
    if (token) {
      uri += `&token=${token}`;
    }

    return uri;
  }

  getStreamName() {
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
    return this.getStreamName()
      .startsWith('in+');
  }

  isErrorState() {
    return this.stream?.status === InputStatus.Error;
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

  async updateSnapshotSettings() {
    const modal = this.modalService.open(StreamSnapshotComponent, { size: 'lg' });
    modal.componentInstance.incoming = this.incomingSnapshotSettings;
    modal.componentInstance.outgoing = this.outgoingSnapshotSettings;

    try {
      const settings = await modal.result;
      if (settings) {
        if (settings.incoming) {
          this.snapshotService.updateSettings(this.id, SourceType.Incoming, settings.incoming).subscribe(
            data => this.updateIncomingSnapshotSettings(data),
            error => alert(error?.error?.message ? error.error.message : 'Something wrong with incoming snapshot settings update')
          );
        } else {
          this.snapshotService.clearSettings(this.id, SourceType.Incoming).subscribe(() => {
            this.updateIncomingSnapshotSettings(null);
          });
        }

        if (settings.outgoing) {
          this.snapshotService.updateSettings(this.id, SourceType.Outgoing, settings.outgoing).subscribe(
            data => this.updateOutgoingSnapshotSettings(data),
            error => alert(error?.error?.message ? error.error.message : 'Something wrong with outgoing snapshot settings update')
          );
        } else {
          this.snapshotService.clearSettings(this.id, SourceType.Outgoing).subscribe(() => {
            this.updateOutgoingSnapshotSettings(null);
          });
        }
      }
    } catch (e) {
    }
  }

  private loadStream() {
    this.streamService.get(this.id)
      .subscribe(data => {
          this.stream = data;

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

  private loadSnapshotSettings() {
    this.snapshotService.getSettings(this.id, SourceType.Incoming)
      .subscribe(data => this.updateIncomingSnapshotSettings(data), () => {});

    this.snapshotService.getSettings(this.id, SourceType.Outgoing)
      .subscribe(data => this.updateOutgoingSnapshotSettings(data), () => {});
  }

  private updateIncomingSnapshotSettings(data: StreamSnapshot) {
    this.incomingSnapshotSettings = data;
    this.refreshIncomingSnapshotPreviewMonitoring();
  }

  private updateOutgoingSnapshotSettings(data: StreamSnapshot) {
    this.outgoingSnapshotSettings = data;
    this.refreshOutgoingSnapshotPreviewMonitoring();
  }

  private loadAll() {
    this.loadStream();
    this.loadOutputs();
    this.loadRecordings();
  }

  private refreshIncomingSnapshotPreviewMonitoring() {
    this.stopIncomingSnapshotPreviewMonitoring();

    if (this.incomingSnapshotSettings) {
      this.incomingSnapshotRefreshTimer = setInterval(() => {
        if (this.stream && this.stream.status === InputStatus.Ingestion) {
          this.loadSnapshot(SourceType.Incoming, (src) => this.incomingSnapshotSrc = src);
        } else {
          if (this.incomingSnapshotSrc) {
            this.incomingSnapshotSrc = null;
          }
        }
      }, this.incomingSnapshotSettings.interval * 1000);
    }
  }

  private stopIncomingSnapshotPreviewMonitoring() {
    if (this.incomingSnapshotRefreshTimer) {
      clearInterval(this.incomingSnapshotRefreshTimer);
    }
    this.incomingSnapshotSrc = null;
  }

  private refreshOutgoingSnapshotPreviewMonitoring() {
    this.stopOutgoingSnapshotPreviewMonitoring();

    if (this.outgoingSnapshotSettings) {
      this.outgoingSnapshotRefreshTimer = setInterval(() => {
        if (this.stream && this.stream.status === InputStatus.Ingestion) {
          this.loadSnapshot(SourceType.Outgoing, (src) => this.outgoingSnapshotSrc = src);
        } else {
          if (this.outgoingSnapshotSrc) {
            this.outgoingSnapshotSrc = null;
          }
        }
      }, this.outgoingSnapshotSettings.interval * 1000);
    }
  }

  private stopOutgoingSnapshotPreviewMonitoring() {
    if (this.outgoingSnapshotRefreshTimer) {
      clearInterval(this.outgoingSnapshotRefreshTimer);
    }
    this.outgoingSnapshotSrc = null;
  }

  private loadSnapshot(source: SourceType, src: any) {
    this.snapshotService.resource(this.id, source)
      .subscribe(data => {
        const fileReader = new FileReader();
        fileReader.onload = () => src(fileReader.result as string);
        fileReader.readAsDataURL(data);
      });
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
