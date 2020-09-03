import { environment } from '../../environments/environment';

export class API {
  public static endpoint() {
    return environment.api.endpoint;
  }
  public static domain() {
    return environment.api.domain;
  }
}
