import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { StatisticsService, StreamStatistics } from '../../service/statistics.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account-statistics-dashboard',
  templateUrl: './account-statistics-dashboard.component.html',
  styleUrls: ['./account-statistics-dashboard.component.css']
})
export class AccountStatisticsDashboardComponent implements OnInit {

  id?: string;
  from: NgbDateStruct;
  to: NgbDateStruct;

  statistics: StreamStatistics[] = [];

  durationTotal = 0;
  uploadTotal = 0;
  downloadTotal = 0;

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
    let statisticsRequest;

    if (this.id) {
      statisticsRequest = this.statisticsService.list(
        new Date(Date.UTC(this.from.year, this.from.month - 1, this.from.day, 0, 0, 0, 0)),
        new Date(Date.UTC(this.to.year, this.to.month - 1, this.to.day, 23, 59, 59, 999)),
        this.id);
    } else {
      statisticsRequest = this.statisticsService.list(
        new Date(Date.UTC(this.from.year, this.from.month - 1, this.from.day, 0, 0, 0, 0)),
        new Date(Date.UTC(this.to.year, this.to.month - 1, this.to.day, 23, 59, 59, 999)));
    }

    statisticsRequest.subscribe(data => {
      // TODO investigate how to copy array
      this.statistics.splice(0, this.statistics.length);
      data
        .map(item => Object.assign(<StreamStatistics>{}, item))
        .forEach(item => this.statistics.push(item));

      this.durationTotal = this.statistics
        .map(item => item.duration)
        .reduce((x, y) => x + y, 0);
      this.uploadTotal = this.statistics
        .map(item => item.upload)
        .reduce((x, y) => x + y, 0);
      this.downloadTotal = this.statistics
        .map(item => item.download)
        .reduce((x, y) => x + y, 0);
    });
  }

  ngOnInit() {
  }

}
