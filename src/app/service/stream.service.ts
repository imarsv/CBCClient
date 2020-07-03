import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API } from './API';

export enum StreamFormat {
  RTMP = 'RTMP',
  WebRTC = 'WebRTC',
  HLS = 'HLS',
  CMAF = 'CMAF',
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

export class Overlay {
  constructor(public data: string,
              public offsetX: number | undefined,
              public offsetY: number | undefined) {
  }
}

export enum MediaType {
  Video = 'Video',
  Audio = 'Audio',
}

export enum CodecType {
  H264 = 'H264',
  VP8 = 'VP8',
  VP9 = 'VP9',
}

export abstract class EncoderSettings {
  public codec: CodecType;
}

export enum SpeedPresetH264 {
  Ultrafast = 'ultrafast', // (1)
  Superfast = 'superfast', // (2)
  Veryfast = 'veryfast', // (3)
  Faster = 'faster', // (4)
  Fast = 'fast', // (5)
  Medium = 'medium', // (6)
  Slow = 'slow', // (7)
  Slower = 'slower', // (8)
  Veryslow = 'veryslow', // (9)
  Placebo = 'placebo', // (10)
}

export class EncoderSettingsH264 extends EncoderSettings {

  // Bitrate in kbit/sec
  public bitrate: number;

  // Preset name for speed/quality tradeoff options
  // (can affect decode compatibility - impose
  // restrictions separately for your target decoder)
  public speedPreset: SpeedPresetH264;

  // Maximal distance between two key-frames (0 for automatic)
  public keyIntMax: number;
}

export class EncoderSettingsVP8 extends EncoderSettings {
  // Bitrate in kbit/sec
  public bitrate: number;

  // Maximum distance between key-frames (number of frames).
  public keyMaxDist: number;
}

export class EncoderSettingsVP9 extends EncoderSettings {
}

export class Track {

  public type: MediaType;

  public width: number;

  public height: number;

  public framerate: number;

  public settings: EncoderSettingsH264 | EncoderSettingsVP8 | EncoderSettingsVP9;
}

export class Output {
  passthrough: boolean;
  overlay: Overlay | undefined;
  tracks: Track[] | undefined;
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

  callbackUri: string | undefined;
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

export interface TrackInfo {

  idx: number;
  type: MediaType;
  codec: string;
  bps: number;

  height: number | undefined;
  width: number | undefined;

  channels: number | undefined;
  rate: number | undefined;
}

@Injectable()
export class StreamService {

  constructor(private auth: AuthService, private httpClient: HttpClient) {
  }

  input(input: Input) {
    return this.httpClient
      .post<InputEndpoint>(`${API.endpoint()}/inputs`, input);
  }

  get(id: string) {
    return this.httpClient
      .get<InputEndpoint>(`${API.endpoint()}/inputs/${id}`);
  }

  getTranscode(id: string) {
    return this.httpClient
      .get<Output>(`${API.endpoint()}/inputs/${id}/output`);
  }

  updateTranscode(id: string, output: Output) {
    return this.httpClient
      .put<Output>(`${API.endpoint()}/inputs/${id}/output`, output);
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

  output(output: StreamOutput) {
    return this.httpClient
      .post<OutputEndpoint>(`${API.endpoint()}/outputs`, output);
  }

  listOutputsByStream(streamId: string) {
    const params = new HttpParams().set('streamId', streamId);
    return this.httpClient
      .get<OutputEndpoint[]>(`${API.endpoint()}/outputs`, { params: params });
  }

  clearSessions(outputId: string) {
    return this.httpClient
      .delete(`${API.endpoint()}/outputs/${outputId}/sessions`);
  }

  deleteOutput(outputId: string) {
    return this.httpClient
      .delete(`${API.endpoint()}/outputs/${outputId}`);
  }

  getIncomingTracksByStream(streamId: string) {
    return this.httpClient
      .get<TrackInfo[]>(`${API.endpoint()}/tracks/${streamId}/incoming`);
  }

  getOutgoingTracksByStream(streamId: string) {
    return this.httpClient
      .get<TrackInfo[]>(`${API.endpoint()}/tracks/${streamId}/outgoing`);
  }
}
