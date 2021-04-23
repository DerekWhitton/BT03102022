export const environment = {
  production: true,
  enforceHttps: true,
  blogRoute: 'https://blog.bushtrade.co.za/',
  apiRoute: 'https://staging-bush-trade-api.azurewebsites.net/',
  apiVersion: '1.0',
  b2c: {
    clientId: '2aa8b9f8-1f4b-4f6d-b4a2-0ab97689ef4f',
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
      'https://stagingbushtrade.onmicrosoft.com/fe7f3487-c419-4040-bcf4-fca1281fce47/api',
    ],
  },
  googleMapsApiKey: 'AIzaSyCakNllm6pq9ZApi4gH-ISoQAH4IhwsRMo',
};
