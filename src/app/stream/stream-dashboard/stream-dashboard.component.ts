import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpConnection, InputEndpoint, InputStatus, StreamFormat, StreamService } from '../../service/stream.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OutputStreamComponent } from '../output-stream/output-stream.component';
import { OutputStreamConnectionComponent } from '../output-stream-connection/output-stream-connection.component';
import { ClipboardService } from '../../service/clipboard.service';

@Component({
  selector: 'app-stream-dashboard',
  templateUrl: './stream-dashboard.component.html',
  styleUrls: ['./stream-dashboard.component.css']
})
export class StreamDashboardComponent implements OnInit {
  viewing = false;
  streamFormat = StreamFormat;
  inputStatus = InputStatus;

  stream?: InputEndpoint;

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
  }

  ngOnInit() {
  }

  getHttpConnection(): HttpConnection {
    return (this.stream.connection as HttpConnection);
  }

  copy() {
    this.clipboardService.copy(this.getHttpConnection().uri);
  }

  async output() {
    const outputStreamModal = this.modalService.open(OutputStreamComponent);
    try {
      const output = await outputStreamModal.result;
      if (output) {
        output.streamId = this.stream.id;
        try {
          const outputEndpoint = await this.streamService.output(output).toPromise();
          console.log(outputEndpoint);
          const outputStreamConnectionModal =  this.modalService.open(OutputStreamConnectionComponent, { size: 'lg' });
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
