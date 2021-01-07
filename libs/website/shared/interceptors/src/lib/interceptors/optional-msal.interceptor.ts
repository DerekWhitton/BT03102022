import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalInterceptor, MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';

@Injectable()
export class OptionalMsalInterceptor implements HttpInterceptor {
  constructor(
    private msalInterceptor: MsalInterceptor,
    private msalSvc: MsalService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.msalSvc.getAccount()) {
      return this.msalInterceptor.intercept(request, next);
    } else {
      return next.handle(request);
    }
  }
}
