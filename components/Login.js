import React from 'react'
import auth0 from 'auth0-js'

import { AUTH_CONFIG } from '../utils/auth0Config'
import AuthService from '../utils/AuthService'

export default class Login extends React.Component {
    static propTypes = {
        authConfig: React.PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    componentDidMount () {
        this.authService = new AuthService();
        this.auth = new auth0.WebAuth({
            domain: AUTH_CONFIG.domain,
            clientID: this.props.authConfig.clientID
        });
    }

    handleLogin(event) {
        const target = event.target;
        event.preventDefault();
        this.auth.redirect.loginWithCredentials({
            connection: 'tidepool-platform',
            username: target.username.value,
            password: target.password.value,
            scope: this.props.authConfig.scope,
            audience: this.props.authConfig.audience,
            responseType: this.props.authConfig.responseType,
            redirectUri: this.props.authConfig.redirectUri 
        });
    }

    render() {
        return <div>
            <form onSubmit={this.handleLogin}>
                <label>Username: <input id="username" name="username" type="text" /></label>
                <br/>
                <label>Password: <input id="password" name="password" type="password"/></label>
                <br/>
                <input type="submit" value="Login" />
            </form>
            <style jsx>{`
            form {
                text-align: center;
                font: 15px Monaco;
            }
            input[type=text], input[type=password] {
                width: 40%;
                padding: 12px 20px;
                margin: 8px 0;
                box-sizing: border-box;
            }
            input[type=submit] {
                width: 20%;
                font: 15px Monaco;
                background-color: #4CAF50;
                border: none;
                color: white;
                padding: 16px 32px;
                text-decoration: none;
                margin: 4px 2px;
                cursor: pointer;
            }
            `}</style>
        </div>
    }
}