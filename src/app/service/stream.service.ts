import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { HttpClient } from '@angular/common/http';
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

export class StreamViewer {
  ipAddress: string | undefined;
  geoLocation: GeoLocation | undefined;
}

export interface OutputEndpoint {
  connection: HttpConnection | WebRTCConnection | undefined;
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
}
