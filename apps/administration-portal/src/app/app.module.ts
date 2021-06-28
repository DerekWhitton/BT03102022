import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MsalBroadcastService,
  MsalGuard,
  MsalGuardConfiguration,
  MsalInterceptor,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalService,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
} from '@azure/msal-angular';
import {
  BrowserCacheLocation,
  InteractionType,
  IPublicClientApplication,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';
import { AdministrationPortalAdministrationAppModule } from '@bushtrade/administration-portal/app';
import * as fromUiStyle from '@bushtrade/administration-portal/shared/state';
import { UiStyleEffects } from '@bushtrade/administration-portal/shared/state';
import { APP_CONFIG } from '@bushtrade/app-config';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

export const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [fromUiStyle.UISTYLE_FEATURE_KEY],
    rehydrate: true,
  })(reducer);
}

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log('msal', message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.b2c.clientId, // This is your client ID
      authority: environment.b2c.authorities.signUpSignIn.authority, // This is your tenant ID
      knownAuthorities: environment.b2c.knownAuthorities,
      redirectUri: window.location.origin, // This is your redirect URI
      postLogoutRedirectUri: window.location.origin,
      navigateToLoginRequestUrl: true,
      // validateAuthority: false,
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: false, // set to true for IE 11
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Warning,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(environment.apiRoute, [
    ...environment.b2c.b2cScopes,
  ]);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: environment.b2c.b2cScopes,
    },
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MsalModule,
    AdministrationPortalAdministrationAppModule,
    StoreModule.forRoot(
      {
        [fromUiStyle.UISTYLE_FEATURE_KEY]: fromUiStyle.reducer,
      },
      {
        metaReducers: [localStorageSyncReducer],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([UiStyleEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    { provide: APP_CONFIG, useValue: environment },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
