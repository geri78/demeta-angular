import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const h: HttpHeaders = AuthenticationService.prepareHeader(req.headers);
    const authReq = req.clone({
      headers: h
    });
    return next.handle(authReq);
  }
}
