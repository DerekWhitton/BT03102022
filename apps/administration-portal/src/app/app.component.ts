import { environment } from '../environments/environment';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, first, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'bushtrade-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'administration-portal';
  private readonly _destroying$ = new Subject<void>();

  constructor(
    private broadcastService: MsalBroadcastService,
    private authService: MsalService
  ) {
    if (
      (window.location as any).protocol != 'https:' &&
      environment.enforceHttps
    ) {
      location.href = location.href.replace('http://', 'https://');
    }
  }

  ngOnInit(): void {
    this.broadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) => msg.eventType === EventType.LOGIN_FAILURE
        ),
        takeUntil(this._destroying$)
      )
      .subscribe((result) => {
        if (
          result?.error?.message?.indexOf(
            'The user has forgotten their password'
          ) !== -1
        ) {
          this.authService.loginRedirect({
            authority: environment.b2c.authorities.resetPassword.authority,
            scopes: environment.b2c.b2cScopes,
          });
        }
      });
  }

  ngOnDestroy(): void {
    this._destroying$.next(null);
    this._destroying$.complete();
  }
}
