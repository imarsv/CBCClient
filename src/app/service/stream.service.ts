import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { InputEndpoint } from './stream.service';

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
  constructor(public stun: string,
              public turn: string,
              public signallingUri: string) {
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

  private url = `http://${location.hostname}:3000`;

  constructor(private auth: AuthService, private httpClient: HttpClient) {
  }

  add(input: Input) {
    return this.httpClient
      .post<InputEndpoint>(`${this.url}/inputs`, input, { headers: { 'Authorization': `Bearer ${this.auth.getToken()}` } });
  }

  get(id: string) {
    return this.httpClient
      .get<InputEndpoint>(`${this.url}/inputs/${id}`, { headers: { 'Authorization': `Bearer ${this.auth.getToken()}` } });
  }

  list() {
    return this.httpClient
      .get<InputEndpoint[]>(`${this.url}/inputs`, { headers: { 'Authorization': `Bearer ${this.auth.getToken()}` } });
  }

  delete(id: string) {
    this.httpClient
      .delete(`${this.url}/inputs/${id}`, { headers: { 'Authorization': `Bearer ${this.auth.getToken()}` } })
      .subscribe((data) => data, error => console.error(error));
  }
}
