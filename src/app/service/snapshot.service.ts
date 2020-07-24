import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './API';
import { SourceType } from './common/source-type.enum';

export enum SnapshotFormatType {
  PNG = 'PNG',
  JPEG = 'JPEG',
}

export enum SnapshotQualityType {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export class StreamSnapshot {

  format: SnapshotFormatType;

  quality: SnapshotQualityType;

  interval: number;
}

@Injectable()
export class SnapshotService {

  constructor(private httpClient: HttpClient) { }

  getSettings(streamId: string, source: SourceType) {
    return this.httpClient
      .get<StreamSnapshot>(`${API.endpoint()}/snapshots/stream/${streamId}/${source}`);
  }

  updateSettings(streamId: string, source: SourceType, settings: StreamSnapshot) {
    return this.httpClient
      .put<StreamSnapshot>(`${API.endpoint()}/snapshots/stream/${streamId}/${source}`, settings);
  }

  clearSettings(streamId: string, source: SourceType) {
    return this.httpClient
      .delete(`${API.endpoint()}/snapshots/stream/${streamId}/${source}`);
  }

  resource(streamId: string, source: SourceType) {
    return this.httpClient
      .get(`${API.endpoint()}/snapshots/stream/${streamId}/${source}/image`,
        { responseType: 'blob' });
  }
}
