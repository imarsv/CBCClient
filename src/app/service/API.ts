import { environment } from '../../environments/environment';

export class API {
  public static endpoint() {
    return `${environment.api.protocol}://${environment.api.hostname}:${environment.api.port}`;
  }

  public static authorizationHeader(token: string) {
    return { 'Authorization': `Bearer ${token}` };
  }
}
