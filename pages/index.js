import React from 'react'
import Router from 'next/router'
import AuthService from '../utils/AuthService'
import DeviceData from '../components/DeviceData'
import Profile from '../components/Profile'
import Settings from '../components/Settings'

export default class extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = { loggedIn: false }
  }

  componentDidMount() {
    this.auth = new AuthService();
    this.setState({ 
      loggedIn: this.auth.loggedIn(),
      accessToken: this.auth.getAccessToken(),
     })
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
    Router.reload('/');
  }

  settings() {
    if (this.state.loggedIn) {
      return (
        <div><Settings /></div>
      );
    }
  }

  profile() {
    if (this.state.loggedIn) {
      return (
        <div><Profile /></div>
      );
    }
  }

  userData() {
    if (this.state.loggedIn) {
      return (
        <div><DeviceData userID="423b3dcf31"  accessToken={this.auth.getAccessToken()} /></div>
      );
    }
  }

  loginState() {
    if (this.state.loggedIn) {
      return (
        <button onClick={this.logout.bind(this)}>Logout</button>
      );
    }
    return <button onClick={this.login.bind(this)}>Login</button>
  }

  render () {
   let data = <div>Please login</div>;
    if (this.state.loggedIn) {
      data = <div>
        {this.profile()}
        {this.settings()} 
        {this.userData()}
      </div>;
    }
    return (
      <div className='app'>
      <div className='header'>
        { this.loginState() }
        <h3> TIDEPOOL AUTH APP </h3>
      </div>
      <div>
        { data }
      </div>
      <style jsx>{`
        .app {
          text-align: center;
        }
        .header {
          font: 15px Monaco;
        }
        table {
          font-family: Arial;
          margin: 25px auto;
          border-collapse: collapse;
          border: 1px solid #eee;
          border-bottom: 2px solid #00cccc;
        }
        td {
          color: #999;
          border: 1px solid #eee;
          padding: 12px 35px;
          border-collapse: collapse;
        }
        hr {
          height: 1px;
          border: 0;
          color: #333;
          background-color: #333;
          width: 60%;
        } 
      `}</style>
      </div>
    )
  }
}