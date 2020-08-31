import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './API';

export enum ProtocolType {
  HTTP = 'http',
  HTTPS = 'https',
}

export class Node {
  constructor(public id: string,
              public name: string,
              public connection: NodeConnection,
              public opened: boolean,
              public enabled: boolean) {
  }
}

export class NodeConnection {
  constructor(public protocol: ProtocolType,
              public hostname: string,
              public port: number) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private httpClient: HttpClient) {
  }

  get(id: string) {
    return this.httpClient
      .get<Node>(`${API.endpoint()}/nodes/${id}`);
  }

  list() {
    console.log('NodeService::list');
    return this.httpClient
      .get<Node[]>(`${API.endpoint()}/nodes`);
  }

  add(node: Node) {
    return this.httpClient
      .post<Node>(`${API.endpoint()}/nodes`, node);
  }

  update(id: string, node: Node) {
    return this.httpClient
      .put<Node>(`${API.endpoint()}/nodes/${id}`, node);
  }

  refresh(id: string) {
    return this.httpClient
      .post(`${API.endpoint()}/nodes/${id}/refresh`, {});
  }

  delete(id: string) {
    this.httpClient
      .delete(`${API.endpoint()}/nodes/${id}`)
      .subscribe((data) => data, error => console.error(error));
  }
}
