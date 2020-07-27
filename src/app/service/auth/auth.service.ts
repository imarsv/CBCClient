import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../API';

@Injectable()
export class AuthService {

  @Output() change: EventEmitter<any> = new EventEmitter();
  private superuserToken?: string = null;
  private token?: string = null;

  private LS_DOMAIN = ''; // 'stackvaults.com' // 'lls.rncdn7.com.'
  private LS_TOKEN_KEY = this.LS_DOMAIN + 'token';
  private LS_SUPERUSER_TOKEN_KEY = this.LS_DOMAIN + 'superuser_token';

  constructor(private httpClient: HttpClient) {
    this.token = localStorage.getItem(this.LS_TOKEN_KEY);
    this.superuserToken = localStorage.getItem(this.LS_SUPERUSER_TOKEN_KEY);
  }

  get authenticated(): boolean {
    return this.token != null;
  }

  get impersonated(): boolean {
    return this.superuserToken != null;
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
      console.error('AuthService authenticate error: ', e);
    }

    return false;
  }

  // authorizationHeader() {
  //   return { 'Authorization': `Bearer ${this.token}` };
  // }

  getToken() {
    return this.token;
  }

  async impersonate(id: string) {
    try {
      interface Token {
        token: string;
      }

      const response = await this.httpClient
        .get<Token>(`${API.endpoint()}/accounts/${id}/impersonate`)
        .toPromise();

      if (response && response.token) {
        this.storeSuperuserToken(this.token);
        this.storeToken(response.token);

        this.change.emit(null);
        return true;
      }
    } catch (e) {
      console.error('AuthService impersonate error: ', e);
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
    localStorage.setItem(this.LS_TOKEN_KEY, token);
  }

  storeSuperuserToken(token: string) {
    this.superuserToken = token;
    localStorage.setItem(this.LS_SUPERUSER_TOKEN_KEY, token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem(this.LS_TOKEN_KEY);
  }

  removeSuperuserToken() {
    this.superuserToken = null;
    localStorage.removeItem(this.LS_SUPERUSER_TOKEN_KEY);
  }
}
