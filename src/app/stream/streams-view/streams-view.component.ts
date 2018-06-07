import { Component, OnInit } from '@angular/core';
import { InputEndpoint, InputStatus, StreamService } from '../../service/stream.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputStreamComponent } from '../input-stream/input-stream.component';

@Component({
  selector: 'app-streams-view',
  templateUrl: './streams-view.component.html',
  styleUrls: ['./streams-view.component.css']
})
export class StreamsViewComponent implements OnInit {

  private _streams: InputEndpoint[];

  public inputStatus = InputStatus;

  constructor(private streamService: StreamService, private modalService: NgbModal) {
    this.load();
  }

  load() {
    this.streamService.list().subscribe(data => this._streams = data);
  }

  ngOnInit() {

  }

  get streams(): InputEndpoint[] {
    return this._streams;
  }

  async newStream() {
    const modalRef = this.modalService.open(InputStreamComponent);

    try {
      const input = await modalRef.result;
      if (input) {
        try {
          await this.streamService.add(input).toPromise();
          this.load();
        } catch (e) {
          alert(e);
        }
      }
    } catch (e) {
    }
  }
}
