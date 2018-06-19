import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHandler, HttpRequest, HttpEvent, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ApiInterceptorService {

  constructor(private injector: Injector, private router: Router) {}

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      const h: HttpHeaders = AuthenticationService.prepareHeader(req.headers);
      const authReq = req.clone({
        headers: h
      });
      return next.handle(authReq);
    }
  }
