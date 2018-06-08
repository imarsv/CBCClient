import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

export interface StreamStatistics {
  streamId: string;
  duration: number;
  upload: number;
  download: number;
}

@Injectable()
export class StatisticsService {

  private url = `http://${location.hostname}:3000`;

  constructor(private auth: AuthService, private httpClient: HttpClient) {
  }

  getByStream(streamId: string, from: Date, to: Date) {
    const url = `${this.url}/statistics/stream/${streamId}/from/${from.toISOString()}/to/${to.toISOString()}`;
    return this.httpClient
      .get<StreamStatistics>(url, { headers: { 'Authorization': `Bearer ${this.auth.getToken()}` } });
  }
}
