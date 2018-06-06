import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { InputEndpoint } from './stream.service';

export interface InputEndpoint {

  /**
   * Stream GUID
   */
  id: string;
}

@Injectable()
export class StreamService {

  constructor(private auth: AuthService, private httpClient: HttpClient) {
  }

  list() {
    const url = `http://${location.hostname}:3000/inputs`;

    return this.httpClient
      .get<InputEndpoint[]>(url, { headers: { 'Authorization': `Bearer ${this.auth.getToken()}` }});
  }
}
