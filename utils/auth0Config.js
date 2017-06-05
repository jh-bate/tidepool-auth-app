export const AUTH_CONFIG = {
  domain: 'tidepool.auth0.com',
  clientId: 'gk9jFZfFoSr1m00ezLa4YtEhBA0YrjmC',
  responseType: 'id_token token',
  scope: 'openid profile read:data',
  audience: 'http://localhost:8009/data',
  redirectUri: 'http://localhost:3007/auth/signed-in'
}
