import { Component, OnInit } from '@angular/core';
import { InputEndpoint, InputStatus, StreamService } from '../../service/stream.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputStreamComponent } from '../input-stream/input-stream.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-streams-view',
  templateUrl: './streams-view.component.html',
  styleUrls: ['./streams-view.component.css']
})
export class StreamsViewComponent implements OnInit {

  private _streams: InputEndpoint[];

  public inputStatus = InputStatus;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private streamService: StreamService, private modalService: NgbModal) {
    this.load();
  }

  load() {
    const compareString = (a: string, b: string) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      }
      return 0;
    };

    this.streamService.list()
      .subscribe(data => {
        this._streams = data.sort((a, b) => {
          let comp = compareString(a.format, b.format);
          if (comp === 0) {
            comp = compareString(a.id, b.id);
          }
          return comp;
        });
      });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.refresh) {
        this.load();
        this.router.navigateByUrl('/streams');
      }
    });
  }

  get streams(): InputEndpoint[] {
    return this._streams;
  }

  async newStream() {
    const ngbModal = this.modalService.open(InputStreamComponent);

    try {
      const input = await ngbModal.result;
      if (input) {
        try {
          await this.streamService.input(input).toPromise();
          this.load();
        } catch (e) {
          alert(e);
        }
      }
    } catch (e) {
    }
  }
}
