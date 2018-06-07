import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InputEndpoint, StreamService } from '../../service/stream.service';

@Component({
  selector: 'app-stream-dashboard',
  templateUrl: './stream-dashboard.component.html',
  styleUrls: ['./stream-dashboard.component.css']
})
export class StreamDashboardComponent implements OnInit {
  viewing = false;
  stream?: InputEndpoint;

  constructor(private streamService: StreamService, private router: Router, activatedRoute: ActivatedRoute) {
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

  delete() {
    if (this.stream.id) {
      this.streamService.delete(this.stream.id);
      this.router.navigateByUrl('/streams');
    }
  }
}
