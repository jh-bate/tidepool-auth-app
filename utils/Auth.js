import React from 'react'

export default class Auth {
  constructor() {
    this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  handleAuthentication() {
    const details = { 
        scope: this.extractScope(), 
        audience: this.extractAudience(),
        responseType: this.extractResponseType(),
        clientID: this.extractClientId(),
        redirectUri: this.extractRedirectUri(),
    }
    window.history.replaceState(null, null, window.location.pathname);
    return details;
  }

  getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  extractScope() {
    return this.getParameterByName('scope');
  }

  extractAudience() {
    return this.getParameterByName('audience');
  }

  extractResponseType() {
    return this.getParameterByName('response_type');
  }

  extractClientId() {
    return this.getParameterByName('client_id');
  }

  extractRedirectUri() {
    return this.getParameterByName('redirect_uri');
  }
}