import { environment } from '../../environments/environment';

export class API {
  public static endpoint() {
    return environment.api.endpoint;
  }
}
