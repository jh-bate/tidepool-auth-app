import React from 'react'
import Link from 'next/link'
import AuthService from '../utils/AuthService'
import DeviceData from '../components/DeviceData'

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
    // instance of Lock
    this.lock = this.auth.getLock();
    this.lock.on('authenticated', () => {
      this.setState({ loggedIn: this.auth.loggedIn() })
    });
  }

  login() {
    this.auth.login();
  }

  render () {
    const loginButton = this.state.loggedIn ? <div>HELLO</div> : <button onClick={this.login.bind(this)}>Login</button>;
    const data = this.state.loggedIn ? <div>{<DeviceData accessToken={this.state.accessToken} userID='423b3dcf31'/>}</div> : <div>Please login to get data</div>;

    return (
      <div className='app'>
      <div className='header'>
        <script src="https://cdn.auth0.com/js/lock/10.5/lock.min.js"></script>
        { loginButton }
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
      `}</style>
      </div>
    )
  }
}