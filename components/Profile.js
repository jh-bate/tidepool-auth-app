import React from 'react'
import AuthService from '../utils/AuthService'

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {profile: {}, error: ''};
  }

  componentDidMount () {
    this.auth = new AuthService();
    this.lock = this.auth.getLock();
    this.ProfileData();
  }

  ProfileData() {
    this.lock.client.userInfo(this.auth.getAccessToken(), (err, user) => {
        if (user) {
          this.setState({profile: user});
        } else if (err) {
          this.setState({error: err.statusText});
        }
    });
  }

  renderProfile() {
    if (this.state.profile && this.state.profile.name){
      return <div>
        Name: {this.state.profile.name}
        <br/>
        <br/>
        Nickname: {this.state.profile.nickname}
        <br/>
        <br/>
      </div>
    }
    return null;
  }

  render() {

    const profile = this.renderProfile(); 

    return <div>
        <div className="header">
          <h3>Profile</h3>
          <hr />
        </div>
        {profile}
        <div className="profile-error">{ this.state.error }</div>
        <style jsx>{`
          .profile-error {
            color: red;
          }
        `}</style>
    </div>
  }
}