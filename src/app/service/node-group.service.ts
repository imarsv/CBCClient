import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from './API';

export class NodeGroup {
  id: string;
  name: string;
  description: string;
  scalable: boolean;
}

@Injectable()
export class NodeGroupService {

  constructor(private httpClient: HttpClient) {
  }

  add(group: NodeGroup) {
    return this.httpClient
      .post<NodeGroup>(`${API.endpoint()}/node-groups`, group);
  }

  get(id: string) {
    return this.httpClient
      .get<NodeGroup>(`${API.endpoint()}/node-groups/${id}`);
  }

  update(id:string, group: NodeGroup) {
    return this.httpClient
      .put<NodeGroup>(`${API.endpoint()}/node-groups/${id}`, group);
  }

  list() {
    return this.httpClient
      .get<NodeGroup[]>(`${API.endpoint()}/node-groups`);
  }
}
