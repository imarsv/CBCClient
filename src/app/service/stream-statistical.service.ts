import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './API';

export interface StreamIncomingStatistic {
  started: Date;
  duration: number;
  upload: number;
  download: number;
}

export interface StreamOutgoingStatistic {
  node: string;
  upload: number;
  download: number;
}

export interface StreamStatistic {
  streamId: string;
  duration: number;
  upload: number;
  download: number;
  incoming: StreamIncomingStatistic[];
  outgoing: StreamOutgoingStatistic[];
}

export interface StatisticsReport {
  streams: StreamStatistic[];
  concurrentSessions: number;
}

@Injectable()
export class StreamStatisticalService {

  constructor(private httpClient: HttpClient) {}

  list(from: Date, to: Date, accountId?: string) {
    let url = `${API.endpoint()}/statistics/stream/from/${from.toISOString()}/to/${to.toISOString()}`;
    if (accountId) {
      url += `?account=${accountId}`;
    }

    return this.httpClient.get<StatisticsReport>(url);
  }

  getByStream(streamId: string, from: Date, to: Date) {
    const url = `${API.endpoint()}/statistics/stream/${streamId}/from/${from.toISOString()}/to/${to.toISOString()}`;
    return this.httpClient.get<StatisticsReport>(url);
  }
}
