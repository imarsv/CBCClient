import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from './API';

@Injectable()
export class AuthService {

  private superuserToken?: string = null;
  private token?: string = null;

  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) {
    this.token = localStorage.getItem('token');
    this.superuserToken = localStorage.getItem('superuser_token');
  }

  async authenticate(username: string, password: string): Promise<boolean> {
    try {
      interface Token {
        token: string;
      }

      const body = { username: username, password: password };

      const response = await this.httpClient.post(`${API.endpoint()}/login`, body).toPromise() as Token;
      if (response && response.token) {
        this.storeToken(response.token);

        this.change.emit(null);
        return true;
      }
    } catch (e) {
      console.log('AuthService authenticate error: ', e);
    }

    return false;
  }

  get authenticated(): boolean {
    return this.token != null;
  }

  getToken() {
    return this.token;
  }

  authorizationHeader() {
    return { 'Authorization': `Bearer ${this.token}` };
  }

  get impersonated(): boolean {
    return this.superuserToken != null;
  }

  async impersonate(id: string) {
    try {
      interface Token {
        token: string;
      }

      const response = await this.httpClient
        .get<Token>(`${API.endpoint()}/account/${id}/impersonate`, { headers: this.authorizationHeader() })
        .toPromise();

      if (response && response.token) {
        this.storeSuperuserToken(this.token);
        this.storeToken(response.token);

        this.change.emit(null);
        return true;
      }
    } catch (e) {
      console.log('AuthService impersonate error: ', e);
    }

    return false;
  }

  unimpersonate() {
    this.storeToken(this.superuserToken);
    this.removeSuperuserToken();

    this.change.emit(null);
  }

  clear() {
    this.removeToken();
    this.removeSuperuserToken();

    this.change.emit(null);
  }

  storeToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  storeSuperuserToken(token: string) {
    this.superuserToken = token;
    localStorage.setItem('superuser_token', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  removeSuperuserToken() {
    this.superuserToken = null;
    localStorage.removeItem('superuser_token');
  }
}
