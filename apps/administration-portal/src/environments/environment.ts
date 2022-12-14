// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  enforceHttps: false,
  apiRoute: 'https://staging-bush-trade-administration-api.azurewebsites.net/',
  apiVersion: '1.0',
  websiteUrl: 'https://staging.bushtrade.com',
  b2c: {
    clientId: '2068976d-1f14-480a-a014-d2d64ddbdcf4',
    names: {
      signUpSignIn: 'B2C_1_B2C_SignUpSignIn',
      resetPassword: 'B2C_1_ResetPassword',
      editProfile: 'B2C_1_EditProfile',
    },
    knownAuthorities: ['stagingbushtrade.b2clogin.com'],
    authorities: {
      signUpSignIn: {
        authority:
          'https://stagingbushtrade.b2clogin.com/stagingbushtrade.onmicrosoft.com/B2C_1_B2C_SignUpSignIn',
      },
      resetPassword: {
        authority:
          'https://stagingbushtrade.b2clogin.com/stagingbushtrade.onmicrosoft.com/B2C_1_ResetPassword',
      },
      editProfile: {
        authority:
          'https://stagingbushtrade.b2clogin.com/stagingbushtrade.onmicrosoft.com/B2C_1_EditProfile',
      },
    },
    scopes: ['openid'],
    b2cScopes: [
      'openid',
      'https://stagingbushtrade.onmicrosoft.com/acedb043-99ef-46c7-952b-558e2434d184/api',
    ],
  },
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
