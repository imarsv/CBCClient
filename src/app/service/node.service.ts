import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { CBCAPI } from './CBCAPI';

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
    return this.httpClient
      .get<Node[]>(`${CBCAPI.endpoint()}/nodes`, { headers: { 'Authorization': `Bearer ${this.auth.getToken()}` } });
  }

  get(id: string) {
    return this.httpClient
      .get<Node>(`${CBCAPI.endpoint()}/nodes/${id}`, { headers: { 'Authorization': `Bearer ${this.auth.getToken()}` } });
  }

  delete(id: string) {
    this.httpClient
      .delete(`${CBCAPI.endpoint()}/nodes/${id}`, { headers: { 'Authorization': `Bearer ${this.auth.getToken()}` } })
      .subscribe((data) => data, error => console.error(error));
  }
}
