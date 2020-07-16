import { Component, Input, OnInit } from '@angular/core';
import { StreamStatistic } from '../../service/stream-statistical.service';

@Component({
  selector: 'app-stream-usage-details',
  templateUrl: './stream-usage-details.component.html',
  styleUrls: ['./stream-usage-details.component.css']
})
export class StreamUsageDetailsComponent implements OnInit {

  @Input() statistic: StreamStatistic;

  constructor() { }

  ngOnInit(): void {
  }

}
