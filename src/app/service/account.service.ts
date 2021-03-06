import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './API';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface Account {
  id: string;
  username: string;
  password: string;
  email: string;
  role: Role;
}

@Injectable()
export class AccountService {

  constructor(private httpClient: HttpClient) {}

  add(account: Account) {
    return this.httpClient
      .post<Account>(`${API.endpoint()}/accounts`, account);
  }

  get(id: string) {
    return this.httpClient
      .get<Account>(`${API.endpoint()}/accounts/${id}`);
  }

  getMyAccount() {
    return this.httpClient
      .get<Account>(`${API.endpoint()}/accounts/whoami`);
  }

  list() {
    return this.httpClient
      .get<Account[]>(`${API.endpoint()}/accounts`);
  }
}
