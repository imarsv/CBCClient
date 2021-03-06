import { Component, Input, OnInit } from '@angular/core';
import { StreamStatistic } from '../../service/stream-statistical.service';

@Component({
  selector: 'app-invoice-print',
  templateUrl: './invoice-print.component.html',
  styleUrls: ['./invoice-print.component.css']
})
export class InvoicePrintComponent implements OnInit {

  now = new Date();

  @Input() from: Date;
  @Input() to: Date;

  @Input() accountName: string;
  @Input() accountNumber: string;

  @Input() statistic: StreamStatistic[];
  @Input() concurrentSessions: number;

  constructor() { }

  ngOnInit(): void {
  }

  getEgress() {
    return this.statistic
      .map(item => {
        const internodeTotal = item.internode
          .reduce((acc, internode) => acc + (internode.upload + internode.download), 0);
        const outgoingTotal = item.outgoing
          .reduce((acc, outgoing) => acc + (outgoing.upload + outgoing.download), 0);
        return internodeTotal + outgoingTotal;
      })
      .reduce((acc, item) => acc + item, 0);
  }
}
