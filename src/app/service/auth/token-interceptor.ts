import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.authenticated) {
      const request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      });

      return next.handle(request);
    }

    return next.handle(req);
  }
}
