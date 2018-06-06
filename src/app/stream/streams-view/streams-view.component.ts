import { Component, OnInit } from '@angular/core';
import { InputEndpoint, StreamService } from '../../service/stream.service';

@Component({
  selector: 'app-streams-view',
  templateUrl: './streams-view.component.html',
  styleUrls: ['./streams-view.component.css']
})
export class StreamsViewComponent implements OnInit {

  private _streams: InputEndpoint[];

  constructor(private streamService: StreamService) {
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
}
