import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
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

  constructor(private auth: AuthService, private httpClient: HttpClient) {
  }

  add(account: Account) {
    return this.httpClient
      .post<Account>(`${API.endpoint()}/account`, account);
  }

  getMyAccount() {
    return this.httpClient
      .get<Account>(`${API.endpoint()}/account/whoami`);
  }

  list() {
    return this.httpClient
      .get<Account[]>(`${API.endpoint()}/account`);
  }
}
