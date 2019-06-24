import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { API } from './API';

export interface StreamStatistics {
  streamId: string;
  duration: number;
  upload: number;
  download: number;
}

@Injectable()
export class StatisticsService {

  constructor(private auth: AuthService, private httpClient: HttpClient) {
  }

  list(from: Date, to: Date, accountId?: string) {
    let url = `${API.endpoint()}/statistics/stream/from/${from.toISOString()}/to/${to.toISOString()}`;
    if (accountId) {
      url += `?account=${accountId}`;
    }

    return this.httpClient
      .get<StreamStatistics>(url);
  }

  getByStream(streamId: string, from: Date, to: Date) {
    const url = `${API.endpoint()}/statistics/stream/${streamId}/from/${from.toISOString()}/to/${to.toISOString()}`;
    return this.httpClient
      .get<StreamStatistics>(url);
  }
}
