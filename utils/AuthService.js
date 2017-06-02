import React from 'react'
import { AUTH_CONFIG } from './auth0Config';

export default class AuthService {
  constructor() {
    // Configure Auth
    this.lock = new Auth0Lock(
      AUTH_CONFIG.clientId,
      AUTH_CONFIG.domain,
      {
        auth: {
          redirectUrl: 'http://localhost:3007',
          responseType: 'code',
          params: {
            scope: 'profile read:data'
          },
        }
      }
    );
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    // binds login functions to keep this context
    this.login = this.login.bind(this);
  }

  _doAuthentication(authResult){
    console.log('authResult: ', authResult);
    this.setTokens(
      authResult.idToken, 
      authResult.accessToken,
    );
  }

  getLock() {
    // An instance of Lock
    return new Auth0Lock(
      AUTH_CONFIG.clientId,
      AUTH_CONFIG.domain,
      {
        auth: {
          redirectUrl: 'http://localhost:3007',
          responseType: 'code',
          params: {
            scope: 'profile read:data'
          },
        }
      }
    );
  }

  login() {
    this.lock.show();
  }

  loggedIn(){
    return !!this.getIDToken();
  }

  setTokens(idToken, accessToken){
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('access_token', accessToken);
  }

  getIDToken(){
    return localStorage.getItem('id_token');
  }

  getAccessToken(){
    return localStorage.getItem('access_token');
  }

  logout(){
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
  }
}