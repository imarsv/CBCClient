import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './API';

export enum StorageType {
  AmazonS3 = 'AmazonS3',
  AmazonS3Compatible = 'AmazonS3Compatible',
}

export class Storage {

  public id: string;

  public name: string;

  public type: StorageType;
}

export class AmazonS3Storage extends Storage {

  public accessKeyId: string;

  public secretAccessKey: string;

  public bucket: string;

  public path?: string;
}

export class AmazonS3CompatibleStorage extends AmazonS3Storage {
  public endpoint: string;
}

@Injectable()
export class StorageService {

  constructor(private httpClient: HttpClient) { }

  add(storage: Storage) {
    return this.httpClient
      .post<Storage>(`${API.endpoint()}/storages`, storage);
  }

  get(id: string) {
    return this.httpClient
      .get<Storage>(`${API.endpoint()}/storages/${id}`);
  }

  list() {
    return this.httpClient
      .get<Storage[]>(`${API.endpoint()}/storages`);
  }

  update(id: string, storage: Storage) {
    return this.httpClient
      .put<Storage>(`${API.endpoint()}/storages/${id}`, storage);
  }

  remove(id: string) {
    return this.httpClient
      .delete<void>(`${API.endpoint()}/storages/${id}`);
  }
}
