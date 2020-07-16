import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { StreamStatistic, StreamStatisticalService } from '../../service/stream-statistical.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, AccountService } from '../../service/account.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stream-bill-dashboard',
  templateUrl: './stream-bill-dashboard.component.html',
  styleUrls: ['./stream-bill-dashboard.component.css']
})
export class StreamBillDashboardComponent implements OnInit {

  id: string;
  from: NgbDateStruct;
  to: NgbDateStruct;

  statistic: StreamStatistic[] = [];

  account: Observable<Account>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private statisticalService: StreamStatisticalService,
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
    this.statisticalService.getByStream(this.id, this.getFromTimestamp(), this.getToTimestamp())
      .subscribe(data => this.statistic.push(data));

    this.account = this.accountService.getMyAccount();
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
