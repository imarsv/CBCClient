import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

export class Node {
  constructor(public id?: string,
              public name?: string,
              public connection?: NodeConnection) {
  }
}

export class NodeConnection {
  constructor(public protocol?: string,
              public hostname?: string,
              public port?: number) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private auth: AuthService, private httpClient: HttpClient) {
  }

  list() {
    const url = `http://${location.hostname}:3000/nodes`;

    return this.httpClient
      .get<Node[]>(url, { headers: { 'Authorization': `Bearer ${this.auth.getToken()}` } });
  }

  get(id: string) {
    const url = `http://${location.hostname}:3000/nodes/${id}`;

    return this.httpClient
      .get<Node>(url, { headers: { 'Authorization': `Bearer ${this.auth.getToken()}` } });
  }
}
