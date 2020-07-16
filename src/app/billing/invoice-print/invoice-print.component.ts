import { Component, Input, OnInit } from '@angular/core';
import { StreamStatistic } from '../../service/stream-statistical.service';

@Component({
  selector: 'app-invoice-print',
  templateUrl: './invoice-print.component.html',
  styleUrls: ['./invoice-print.component.css']
})
export class InvoicePrintComponent implements OnInit {

  @Input() statistic: StreamStatistic;

  constructor() { }

  ngOnInit(): void {
  }

}
