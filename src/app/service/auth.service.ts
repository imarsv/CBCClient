import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  private superuserToken?: string = null;
  private token?: string = null;

  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) {
  }

  async authenticate(username: string, password: string): Promise<boolean> {
    try {
      const url = `http://${location.hostname}:3000/login`;
      const body = { username: username, password: password };

      interface Token {
        token: string;
      }

      const response = await this.httpClient.post(url, body).toPromise() as Token;
      if (response && response.token) {
        this.token = response.token;
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

  get impersonated(): boolean {
    return this.superuserToken != null;
  }

  async impersonate(id: string) {
    try {
      const url = `http://${location.hostname}:3000/account/${id}/impersonate`;

      interface Token {
        token: string;
      }

      const response = await this.httpClient.get<Token>(url, { headers: { 'Authorization': `Bearer ${this.token}` } }).toPromise();
      if (response && response.token) {
        this.superuserToken = this.token;
        this.token = response.token;
        this.change.emit(null);
        return true;
      }
    } catch (e) {
      console.log('AuthService impersonate error: ', e);
    }

    return false;
  }

  unimpersonate() {
    this.token = this.superuserToken;
    this.superuserToken = null;
    this.change.emit(null);
  }

  clear() {
    this.token = null;
    this.superuserToken = null;
    this.change.emit(null);
  }
}
