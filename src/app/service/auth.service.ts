import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  private token?: string = null;

  constructor(private httpClient: HttpClient) {
    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJ1c2VySWQiOiJhNzgzYjhjZC01ODNjLTQ4NWQtOTcyMS1mZDczN2RhOGQ0YTIiLCJpYXQiOjE1MjQ1Nzk4MzR9.' +
      'XdK3-kbL80SnoHvvUNUKEpZg0E3PaN3YYpywv9pUxFg';
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

  clear() {
    this.token = null;
  }
}
