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
  email: string;
  role: Role;
}

@Injectable()
export class AccountService {

  private url = `http://${location.hostname}:3000`;

  constructor(private auth: AuthService, private httpClient: HttpClient) {
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
