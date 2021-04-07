export const environment = {
  production: true,
  enforceHttps: true,
  apiRoute: 'https://staging-bush-trade-administration-api.azurewebsites.net/',
  apiVersion: '1.0',
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
