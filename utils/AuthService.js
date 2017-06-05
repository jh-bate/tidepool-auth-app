import React from 'react'
import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0Config';

export default class AuthService {
  constructor() {
    // Configure Auth
    this.lock = this.getLock();
    // Add callback for lock `authenticated` event
    // binds login functions to keep this context
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleAuthentication() {
    this.lock.parseHash((err, authResult) => {
      console.log('authResult: ',authResult);
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    if (authResult && authResult.accessToken && authResult.idToken) {
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
    }
  }

  getLock() {
    // An instance of Lock
    return new auth0.WebAuth({
      domain: AUTH_CONFIG.domain,
      clientID: AUTH_CONFIG.clientId,
      redirectUri: AUTH_CONFIG.redirectUri,
      audience: AUTH_CONFIG.audience,
      responseType: AUTH_CONFIG.responseType,
      scope: AUTH_CONFIG.scope
    });
  }

  login() {
    this.lock.authorize();
  }

  loggedIn(){
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    console.log('logged in?? ',new Date().getTime() < expiresAt);
    return new Date().getTime() < expiresAt;
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
    localStorage.removeItem('expires_at');
  }
}