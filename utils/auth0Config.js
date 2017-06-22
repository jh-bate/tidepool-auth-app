export const AUTH_CONFIG = {
  domain: 'tidepool.auth0.com',
  clientId: '<app_client_id>',
  responseType: 'id_token token',
  scope: 'openid profile read:data',
  audience: 'http://localhost:8009/data',
  redirectUri: 'http://localhost:3007/auth/signed-in'
}
