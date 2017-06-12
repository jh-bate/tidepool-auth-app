import React from 'react'
import Login from '../components/Login'

import Auth from '../utils/Auth'

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = { authParams: null };
  }

  componentDidMount () {
    this.auth = new Auth();
    this.setState({ authParams: this.auth.handleAuthentication() });
  }
  
  render () {
    
    let login;
    if (this.state.authParams) {
      login = <Login authConfig={this.state.authParams}/>;
    }

    return (
      <div className='app'>
        <div className='header'>
          <h3> TIDEPOOL AUTH APP </h3>
        </div>
        <div>
          {login}
        </div>
        <style jsx>{`
          .app {
            text-align: center;
          }
          .header {
            font: 15px Monaco;
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