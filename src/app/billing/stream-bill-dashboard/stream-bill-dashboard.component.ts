import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { StreamStatistic, StreamStatisticalService } from '../../service/stream-statistical.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-stream-bill-dashboard',
  templateUrl: './stream-bill-dashboard.component.html',
  styleUrls: ['./stream-bill-dashboard.component.css']
})
export class StreamBillDashboardComponent implements OnInit {

  id: string;
  from: NgbDateStruct;
  to: NgbDateStruct;

  statistics?: StreamStatistic;
  statisticsList: StreamStatistic[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              protected statisticsService: StreamStatisticalService) {
    this.id = activatedRoute.snapshot.params['id'];

    const now = new Date();
    const from = new Date(now.getFullYear(), now.getMonth(), 1);
    const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    this.from = { year: from.getFullYear(), month: from.getMonth() + 1, day: from.getDate() };
    this.to = { year: to.getFullYear(), month: to.getMonth() + 1, day: to.getDate() };

    this.load();
  }

  load() {
    this.statisticsService.getByStream(this.id,
      new Date(Date.UTC(this.from.year, this.from.month - 1, this.from.day, 0, 0, 0, 0)),
      new Date(Date.UTC(this.to.year, this.to.month - 1, this.to.day, 23, 59, 59, 999)))
      .subscribe(data => {
        if (!this.statistics) {
          this.statistics = <StreamStatistic>{};
        }
        Object.assign(this.statistics, data);


        this.statisticsList.push(data);
      });
  }

  ngOnInit() {
  }

  print() {
    window.print();
  }

}
