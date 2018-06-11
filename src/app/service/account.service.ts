import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

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

  private url = `http://${location.hostname}:3000`;

  constructor(private auth: AuthService, private httpClient: HttpClient) {
  }

  add(account: Account) {
    return this.httpClient
      .post<Account>(`${this.url}/account`, account, { headers: { 'Authorization': `Bearer ${this.auth.getToken()}` } });
  }

  getMyAccount() {
    return this.httpClient
      .get<Account>(`${this.url}/account/whoami`, { headers: { 'Authorization': `Bearer ${this.auth.getToken()}` } });
  }

  list() {
    return this.httpClient
      .get<Account[]>(`${this.url}/account`, { headers: { 'Authorization': `Bearer ${this.auth.getToken()}` } });
  }
}
