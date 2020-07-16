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

  constructor() { }

  ngOnInit(): void {
  }

  getUploadTotal() {
    return this.statistic
      .map(item => item.upload)
      .reduce((acc, val) => acc + val, 0);
  }

  getDownloadTotal() {
    return this.statistic
      .map(item => item.download)
      .reduce((acc, val) => acc + val, 0);
  }

}
