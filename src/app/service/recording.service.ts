import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './API';

export enum FileFormat {
  MKV = 'MKV',
}

export enum SourceType {
  Input = 'Input',
  Output = 'Output',
}

export enum RecordingState {
  Recording = 'Recording',
  Uploading = 'Uploading',
  Completed = 'Completed',
  Error = 'Error',
}

export class Recording {

  public id: string;

  public streamId: string;

  public fileName: string;

  public fileFormat: FileFormat;

  public sourceType: SourceType;

  public storageId: string;

  public state: RecordingState;

  public duration: number;

  public size: number;
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

  stop(id: string) {
    return this.httpClient
      .put<void>(`${API.endpoint()}/recordings/${id}/stop`, {});
  }

  delete(id: string) {
    return this.httpClient
      .delete(`${API.endpoint()}/recordings/${id}`);
  }
}
