import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './API';
import { MediaType } from './stream.service';
import { SourceType } from './common/source-type.enum';

export enum FileFormat {
  MKV = 'MKV',
}

export enum RecordingState {
  Recording = 'Recording',
  Uploading = 'Uploading',
  Completed = 'Completed',
  Error = 'Error',
}

export class TrackSelector {

  public idx: number | undefined;

  public type: MediaType;
}

export class StreamCapture {

  public source: SourceType;

  public tracks: TrackSelector[] | undefined;
}

export class Recording {

  public id: string;

  public streamId: string;

  public fileName: string;

  public fileFormat: FileFormat;

  public capture: StreamCapture;

  public storageId: string;

  public state: RecordingState;

  public duration: number;

  public length: number;

  public uploaded: number;

  public messages: string[];

  public callbackUri?: string;
}

@Injectable()
export class RecordingService {

  constructor(private httpClient: HttpClient) { }

  add(recording: Recording) {
    return this.httpClient
      .post<Recording>(`${API.endpoint()}/recordings`, recording);
  }

  get(id: string) {
    return this.httpClient
      .get<Recording>(`${API.endpoint()}/recordings/${id}`);
  }

  list() {
    return this.httpClient
      .get<Recording[]>(`${API.endpoint()}/recordings`);
  }

  listByStream(streamId: string) {
    return this.httpClient
      .get<Recording[]>(`${API.endpoint()}/recordings/stream/${streamId}`);
  }

  stop(id: string) {
    return this.httpClient
      .put<void>(`${API.endpoint()}/recordings/${id}/stop`, {});
  }

  delete(id: string) {
    return this.httpClient
      .delete(`${API.endpoint()}/recordings/${id}`);
  }
}
