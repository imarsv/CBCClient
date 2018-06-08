import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { StatisticsService, StreamStatistics } from '../../service/statistics.service';

@Component({
  selector: 'app-stream-statistics-dashboard',
  templateUrl: './stream-statistics-dashboard.component.html',
  styleUrls: ['./stream-statistics-dashboard.component.css']
})
export class StreamStatisticsDashboardComponent implements OnInit {

  id: string;
  from: NgbDateStruct;
  to: NgbDateStruct;

  statistics?: StreamStatistics;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              protected statisticsService: StatisticsService) {
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
          this.statistics = <StreamStatistics>{};
        }
        Object.assign(this.statistics, data);
      });
  }

  ngOnInit() {
  }
}
