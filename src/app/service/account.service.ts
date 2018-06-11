import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { CBCAPI } from './CBCAPI';

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

  constructor(private auth: AuthService, private httpClient: HttpClient) {
  }

  add(account: Account) {
    return this.httpClient
      .post<Account>(`${CBCAPI.endpoint()}/account`, account,
        { headers: { 'Authorization': `Bearer ${this.auth.getToken()}` } });
  }

  getMyAccount() {
    return this.httpClient
      .get<Account>(`${CBCAPI.endpoint()}/account/whoami`,
        { headers: { 'Authorization': `Bearer ${this.auth.getToken()}` } });
  }

  list() {
    return this.httpClient
      .get<Account[]>(`${CBCAPI.endpoint()}/account`,
        { headers: { 'Authorization': `Bearer ${this.auth.getToken()}` } });
  }
}
