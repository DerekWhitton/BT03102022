import { Component } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { environment } from '../environments/environment';

@Component({
  selector: 'bushtrade-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'administration-portal';

  constructor(
    private broadcastService: BroadcastService,
    private authService: MsalService
  ){
    if (
      (window.location as any).protocol != 'https:' &&
      environment.enforceHttps
    ) {
      location.href = location.href.replace('http://', 'https://');
    }
  }
  

  ngOnInit(): void {
    // event listeners for authentication status
    this.broadcastService.subscribe('msal:loginSuccess', (success) => {
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
    });

    // redirect callback for redirect flow (IE)
    this.authService.handleRedirectCallback((authError, response) => {
      if (authError) {
        console.error('Redirect Error: ', authError.errorMessage);
        return;
      }
    });
  }
}
