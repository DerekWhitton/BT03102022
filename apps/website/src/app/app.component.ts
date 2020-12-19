import { Component, OnInit } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { IUser } from '@bushtrade/website/shared/entites';
import { loadUser, getUser } from '@bushtrade/website/shared/state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'bushtrade-web-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'website';
  loggedIn: boolean;
  constructor(
    private broadcastService: BroadcastService,
    private authService: MsalService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.loggedIn = this.authService.getAccount() !== null ? true : false;
    // event listeners for authentication status
    this.broadcastService.subscribe('msal:loginSuccess', (success) => {
      this.store.dispatch(loadUser());
      // We need to reject id tokens that were not issued with the default sign-in policy.
      // "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr")
      // To learn more about b2c tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
      if (
        success.idToken.claims['acr'] === environment.b2c.names.resetPassword
      ) {
        window.alert(
          'Password has been reset successfully. \nPlease sign-in with your new password'
        );
        return this.authService.logout();
      }
    });

    this.broadcastService.subscribe('msal:loginFailure', (error) => {
      if (error.errorMessage.indexOf('AADB2C90118') > -1) {
        this.authService.loginRedirect(
          environment.b2c.authorities.resetPassword
        );
      }
      if (error.errorMessage.indexOf('AADB2C90077') > -1) {
        this.authService.loginRedirect(
          environment.b2c.authorities.signUpSignIn
        );
      }
    });

    this.broadcastService.subscribe('msal:acquireTokenFailure', (error) => {
      console.log('caught token timeout error');
    });

    // redirect callback for redirect flow (IE)
    this.authService.handleRedirectCallback((authError, response) => {
      if (authError) {
        console.error('Redirect Error: ', authError.errorMessage);
        return;
      }
    });
  }

  login() {
    console.log('login');
    this.authService.loginRedirect();
  }
}
