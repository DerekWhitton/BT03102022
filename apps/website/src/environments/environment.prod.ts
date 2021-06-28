export const environment = {
  production: true,
  enforceHttps: true,
  blogRoute: 'https://blog.bushtrade.co.za/',
  apiRoute: 'https://bush-trade-production-api-client.azurewebsites.net',
  apiVersion: '1.0',
  b2c: {
    clientId: '7a9f8a9d-067f-4cfb-a9ea-182ac4e1229f',
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
      'https://bushtradeproduction.onmicrosoft.com/c035551e-b12b-409e-b4f0-33a9d9a5deb7/api'
    ],
  },
  googleMapsApiKey: 'AIzaSyCakNllm6pq9ZApi4gH-ISoQAH4IhwsRMo',
};
