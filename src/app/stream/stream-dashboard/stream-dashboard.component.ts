import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {OutputStreamComponent} from '../output-stream/output-stream.component';
import {OutputStreamConnectionComponent} from '../output-stream-connection/output-stream-connection.component';
import {ClipboardService} from '../../service/clipboard.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-stream-dashboard',
  templateUrl: './stream-dashboard.component.html',
  styleUrls: ['./stream-dashboard.component.css']
})
export class StreamDashboardComponent implements OnInit {
  viewing = false;
  streamFormat = StreamFormat;
  accessMode = AccessMode;
  inputStatus = InputStatus;

  stream?: InputEndpoint;
  outputs: Observable<OutputEndpoint[]>;

  constructor(private streamService: StreamService, private clipboardService: ClipboardService,
              private modalService: NgbModal,
              private router: Router, private activatedRoute: ActivatedRoute) {

    const id = activatedRoute.snapshot.params['id'];
    this.streamService.get(id)
      .subscribe(item => {
        if (!this.stream) {
          this.stream = <InputEndpoint>{};
        }
        return Object.assign(this.stream, item);
      });

    this.loadOutputs(id);
  }

  ngOnInit() {
  }

  getHttpConnection(): HttpConnection {
    return (this.stream.connection as HttpConnection);
  }

  getWebRTCConnection(): WebRTCConnection {
    return (this.stream.connection as WebRTCConnection);
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

          this.loadOutputs(output.streamId);

          const outputStreamConnectionModal = this.modalService.open(OutputStreamConnectionComponent, {size: 'lg'});
          outputStreamConnectionModal.componentInstance.format = output.format;
          outputStreamConnectionModal.componentInstance.endpoint = outputEndpoint;
        } catch (e) {
          console.log('E', e);
        }
      }
    } catch (e) {
    }
  }

  clearSessions(id: string) {
    this.streamService.clearSessions(id).subscribe(item => {
      if (this.stream) {
        this.loadOutputs(this.stream.id);
      }
    });
  }

  deleteOutput(id: string) {
    this.streamService.deleteOutput(id).subscribe(item => {
      if (this.stream) {
        this.loadOutputs(this.stream.id);
      }
    });

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

  private getHostname() {
    const uri = this.getConnectionURI();
    if (uri) {
      const match = uri.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
      if (match && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        return match[2];
      }
    }
  }

  private loadOutputs(id: string) {
    console.log(`Loading outputs #${id}`);
    this.outputs = this.streamService.listOutputsByStream(id);
  }
}
