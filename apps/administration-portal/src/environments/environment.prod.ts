export const environment = {
  production: true,
  enforceHttps: true,
  apiRoute: 'https://bush-trade-production-api-administration.azurewebsites.net',
  apiVersion: '1.0',
  b2c: {
    clientId: '93720789-2a7a-4a7c-ad8a-66fa6a792ae8',
    names: {
      signUpSignIn: 'B2C_1_B2C_SignUpSignIn',
      resetPassword: 'B2C_1_ResetPassword',
      editProfile: 'B2C_1_EditProfile',
    },
    knownAuthorities: ['bushtradeproduction.b2clogin.com'],
    authorities: {
      signUpSignIn: {
        authority:
          'https://bushtradeproduction.b2clogin.com/bushtradeproduction.onmicrosoft.com/B2C_1_B2C_SignUpSignIn',
      },
      resetPassword: {
        authority:
          'https://bushtradeproduction.b2clogin.com/bushtradeproduction.onmicrosoft.com/B2C_1_ResetPassword',
      },
      editProfile: {
        authority:
          'https://bushtradeproduction.b2clogin.com/bushtradeproduction.onmicrosoft.com/B2C_1_EditProfile',
      },
    },
    scopes: ['openid'],
    b2cScopes: [
      'openid',
      'https://bushtradeproduction.onmicrosoft.com/d06c9b27-5178-448f-bf0e-9cb5d24f2bf4/api',
    ],
  },
};
