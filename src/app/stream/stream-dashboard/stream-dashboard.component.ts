import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AccessMode,
  HttpConnection,
  InputEndpoint,
  InputStatus,
  StreamFormat,
  StreamService,
  ViewerOutput,
  WebRTCConnection
} from '../../service/stream.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OutputStreamComponent } from '../output-stream/output-stream.component';
import { OutputStreamConnectionComponent } from '../output-stream-connection/output-stream-connection.component';
import { ClipboardService } from '../../service/clipboard.service';
import { Observable } from 'rxjs';

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
  viewers: Observable<ViewerOutput[]>;

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

    this.viewers = this.streamService.viewers(id);
  }

  ngOnInit() {
  }

  getHttpConnection(): HttpConnection {
    return (this.stream.connection as HttpConnection);
  }

  getWebRTCConnection(): WebRTCConnection {
    return (this.stream.connection as WebRTCConnection);
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

          const outputStreamConnectionModal = this.modalService.open(OutputStreamConnectionComponent, { size: 'lg' });
          outputStreamConnectionModal.componentInstance.format = output.format;
          outputStreamConnectionModal.componentInstance.endpoint = outputEndpoint;
        } catch (e) {
          console.log('E', e);
        }
      }
    } catch (e) {
    }
  }

  delete() {
    if (this.stream.id) {
      this.streamService.delete(this.stream.id);
      this.router.navigateByUrl('/streams');
    }
  }
}
