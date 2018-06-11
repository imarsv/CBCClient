import { environment } from '../../environments/environment';

export class CBCAPI {
  public static endpoint() {
    return `${environment.api.protocol}://${environment.api.hostname}:${environment.api.port}`;
  }
}
