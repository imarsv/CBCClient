import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpConnection, InputEndpoint, InputStatus, StreamFormat, StreamService } from '../../service/stream.service';

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

  constructor(private streamService: StreamService, private router: Router, activatedRoute: ActivatedRoute) {
    const id = activatedRoute.snapshot.params['id'];
    this.streamService.get(id)
      .subscribe(item => {
        if (!this.stream) {
          this.stream = <InputEndpoint>{};
        }
        console.log(item);
        return Object.assign(this.stream, item);
      });
  }

  ngOnInit() {
  }

  getHttpConnection(): HttpConnection {
    return (this.stream.connection as HttpConnection);
  }

  output() {

  }

  delete() {
    if (this.stream.id) {
      this.streamService.delete(this.stream.id);
      this.router.navigateByUrl('/streams');
    }
  }
}
