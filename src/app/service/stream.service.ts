import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { InputEndpoint } from './stream.service';
import { API } from './API';

export enum StreamFormat {
  RTMP = 'RTMP',
  WebRTC = 'WebRTC',
  HLS = 'HLS',
  DASH = 'DASH',
}

export enum InputStatus {
  Pending = 'Pending',
  Idle = 'Idle',
  Ingestion = 'Ingestion',
  Error = 'Error',
}

export class HttpConnection {
  constructor(public uri: string) {
  }
}

export class WebRTCConnection {
  constructor(public signallingUri: string,
              public stun?: string,
              public turn?: string) {
  }
}

export class Streamer {
  constructor(public ipAddress: string) {
  }
}

export class Input {

  format: StreamFormat;

  output: Output;

  streamer: InputStreamer | undefined;

  callbackUri: string | undefined;

  access: AccessMode | undefined;

  accessToken: string | undefined;
}

export class Output {
  constructor(public passthrough: boolean) {
  }
}


export class InputStreamer {
  ipAddress: string | undefined;
  geoLocation: GeoLocation | undefined;
}

export class GeoLocation {
  constructor(public latitude: number, public longitude: number) {
  }
}

export class StreamOutput {

  streamId: string;

  format: StreamFormat;

  viewer: StreamViewer | undefined;
}

export enum AccessMode {
  Public = 'Public',
  Private = 'Private',
}

export class StreamViewer {
  accessToken: string;
  ipAddress: string | undefined;
  geoLocation: GeoLocation | undefined;
}

export interface OutputEndpoint {
  id: string | undefined;
  connection: HttpConnection | WebRTCConnection | undefined;
  viewer: StreamViewer | undefined;
  sessions: string[] | undefined;
  callbackUri: string | undefined;
}

export interface InputEndpoint {

  /**
   * Stream GUID
   */
  id: string;

  format: StreamFormat;

  /**
   * Endpoint for input
   */
  connection: HttpConnection | WebRTCConnection | undefined;

  streamer: Streamer | undefined;

  /**
   * Input stream parameters
   */
  parameters: object | undefined;

  /**
   * Stream status
   */
  status: InputStatus;

  /**
   * Stream status messages
   */
  statusMessages: string[];

  callbackUri: string | undefined;

  access: AccessMode | undefined;

  accessToken: string | undefined;
}

@Injectable()
export class StreamService {

  constructor(private auth: AuthService, private httpClient: HttpClient) {
  }

  input(input: Input) {
    return this.httpClient
      .post<InputEndpoint>(`${API.endpoint()}/inputs`, input);
  }

  output(output: StreamOutput) {
    return this.httpClient
      .post<OutputEndpoint>(`${API.endpoint()}/outputs`, output);
  }

  listOutputsByStream(streamId: string) {
    const params = new HttpParams().set('streamId', streamId);
    return this.httpClient
      .get<OutputEndpoint[]>(`${API.endpoint()}/outputs`, { params: params });
  }

  get(id: string) {
    return this.httpClient
      .get<InputEndpoint>(`${API.endpoint()}/inputs/${id}`);
  }

  list() {
    return this.httpClient
      .get<InputEndpoint[]>(`${API.endpoint()}/inputs`);
  }

  delete(id: string) {
    this.httpClient
      .delete(`${API.endpoint()}/inputs/${id}`)
      .subscribe((data) => data, error => console.error(error));
  }

  clearSessions(outputId: string) {
    return this.httpClient
      .delete(`${API.endpoint()}/outputs/${outputId}/sessions`);
  }

  deleteOutput(outputId: string) {
    return this.httpClient
      .delete(`${API.endpoint()}/outputs/${outputId}`);
  }
}
