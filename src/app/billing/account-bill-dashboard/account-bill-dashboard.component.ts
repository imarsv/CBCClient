import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { StreamStatistic, StreamStatisticalService } from '../../service/stream-statistical.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, AccountService } from '../../service/account.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-bill-dashboard',
  templateUrl: './account-bill-dashboard.component.html',
  styleUrls: ['./account-bill-dashboard.component.css']
})
export class AccountBillDashboardComponent implements OnInit {

  id?: string;
  from: NgbDateStruct;
  to: NgbDateStruct;

  statistic: StreamStatistic[] = [];
  account: Observable<Account>;

  durationTotal = 0;
  uploadTotal = 0;
  downloadTotal = 0;
  concurrentSessions = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              protected statisticsService: StreamStatisticalService,
              private accountService: AccountService) {
    this.id = activatedRoute.snapshot.params['id'];

    const now = new Date();
    const from = new Date(now.getFullYear(), now.getMonth(), 1);
    const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    this.from = { year: from.getFullYear(), month: from.getMonth() + 1, day: from.getDate() };
    this.to = { year: to.getFullYear(), month: to.getMonth() + 1, day: to.getDate() };

    this.load();
  }

  load() {
    let request;

    if (this.id) {
      request = this.statisticsService.list(this.getFromTimestamp(), this.getToTimestamp(), this.id);
      this.account = this.accountService.get(this.id);
    } else {
      request = this.statisticsService.list(this.getFromTimestamp(), this.getToTimestamp());
      this.account = this.accountService.getMyAccount();
    }

    request.subscribe(data => {
      this.statistic = data.streams;
      this.concurrentSessions = data.concurrentSessions;

      const { duration, upload, download } = this.statistic
        .reduce((statsAcc, item) => {

          statsAcc.duration += item.duration;

          const { incomingUploadTotal, incomingDownloadTotal } = item.incoming
            .reduce((acc, val) => {
              acc.incomingUploadTotal += val.upload;
              acc.incomingDownloadTotal += val.download;
              return acc;
            }, { incomingUploadTotal: 0, incomingDownloadTotal: 0 });

          const { internodeUploadTotal, internodeDownloadTotal } = item.internode
            .reduce((acc, val) => {
              acc.internodeUploadTotal += val.upload;
              acc.internodeDownloadTotal += val.download;
              return acc;
            }, { internodeUploadTotal: 0, internodeDownloadTotal: 0 });

          const { outgoingUploadTotal, outgoingDownloadTotal } = item.outgoing
            .reduce((acc, val) => {
              acc.outgoingUploadTotal += val.upload;
              acc.outgoingDownloadTotal += val.download;
              return acc;
            }, { outgoingUploadTotal: 0, outgoingDownloadTotal: 0 });

          statsAcc.upload += incomingUploadTotal + internodeUploadTotal + outgoingUploadTotal;
          statsAcc.download += incomingDownloadTotal + internodeDownloadTotal + outgoingDownloadTotal;
          return statsAcc;
        }, { duration: 0, upload: 0, download: 0 });

      this.durationTotal = duration;
      this.uploadTotal = upload;
      this.downloadTotal = download;
    });
  }

  getFromTimestamp() {
    return new Date(Date.UTC(this.from.year, this.from.month - 1, this.from.day, 0, 0, 0, 0));
  }

  getToTimestamp() {
    return new Date(Date.UTC(this.to.year, this.to.month - 1, this.to.day, 23, 59, 59, 999));
  }

  ngOnInit() {
  }

  print() {
    window.print();
  }
}
