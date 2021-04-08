import { Component, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import {
  EventMessage,
  EventType,
  InteractionStatus,
} from '@azure/msal-browser';
import { loadUser } from '@bushtrade/website/shared/state';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Component({
  selector: 'bushtrade-web-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'website';
  private readonly _destroying$ = new Subject<void>();
  loggedIn: boolean;
  constructor(
    private broadcastService: MsalBroadcastService,
    private authService: MsalService,
    private store: Store
  ) {
    if (
      (window.location as any).protocol != 'https:' &&
      environment.enforceHttps
    ) {
      location.href = location.href.replace('http://', 'https://');
    }
  }

  ngOnInit(): void {
    this.authService.handleRedirectObservable().subscribe();

    this.broadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        if (
          this.authService.instance.getAllAccounts() &&
          this.authService.instance.getAllAccounts().length
        ) {
          this.loggedIn = true;
          this.store.dispatch(loadUser());
        }
      });

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

  login() {
    this.authService.loginRedirect({
      authority: environment.b2c.authorities.signUpSignIn.authority,
      scopes: environment.b2c.b2cScopes,
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this._destroying$.next(null);
    this._destroying$.complete();
  }
}
