import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdministrationPortalAdministrationAppModule } from '@bushtrade/administration-portal/app';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as fromUiStyle from '@bushtrade/administration-portal/shared/state';
import { UiStyleEffects } from '@bushtrade/administration-portal/shared/state';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { APP_CONFIG } from '@bushtrade/app-config';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalInterceptor, MsalModule, MsalService } from '@azure/msal-angular';

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
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MsalModule.forRoot(
      {
        auth: {
          clientId: environment.b2c.clientId,
          authority: environment.b2c.authorities.signUpSignIn.authority,
          redirectUri: window.location.origin,
          postLogoutRedirectUri: window.location.origin,
          navigateToLoginRequestUrl: true,
          validateAuthority: false,
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: isIE,
        },
      },
      {
        popUp: false, //!isIE,
        consentScopes: [
          ...environment.b2c.scopes,
          ...environment.b2c.b2cScopes,
        ],
        unprotectedResources: [],
        protectedResourceMap: [
          [environment.apiRoute, environment.b2c.b2cScopes],
        ],
        extraQueryParameters: {},
      }
    ),
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
    MsalService,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
