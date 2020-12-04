import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebsiteWebsiteAppModule } from '@bushtrade/website/website-app';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import {
  MsalModule,
  MsalInterceptor,
  MsalGuard,
  MsalService,
} from '@azure/msal-angular';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    WebsiteWebsiteAppModule,
    MsalModule.forRoot(
      {
        auth: {
          clientId: environment.b2c.clientId, // This is your client ID
          authority: environment.b2c.authorities.signUpSignIn.authority, // This is your tenant ID
          redirectUri: window.location.origin, // This is your redirect URI
          postLogoutRedirectUri: window.location.origin,
          navigateToLoginRequestUrl: true,
          validateAuthority: false,
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
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
  ],
  providers: [MsalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
