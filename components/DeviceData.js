import React from 'react'
import axios from 'axios';

export default class DeviceData extends React.Component {
  static propTypes = {
    userID: React.PropTypes.string.isRequired,
    accessToken: React.PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {data: [], error: ''};
  }

  componentDidMount() {
    this.UserData();
  }

  UserData() {
    const authStr = `Bearer ${this.props.accessToken}`;
    const url = `http://localhost:8009/data/${this.props.userID}`;
    console.log('Authorization: ', authStr);
    return axios.get(url, { headers: { Authorization: authStr }})
      .then((response) => {
        this.setState({ data: data.results });
      })
      .catch((error) => {
        console.log('Data call: ',error);
        this.setState({ error: 'errored getting data' });
      });
  }

  render() {
    const deviceData = this.state.data.map((item, i) => {
      return <div>
        <span>{item}</span>
      </div>
    });
    return <div id="layout-content" className="layout-content-wrapper">
      <div className="data-list">{ deviceData }</div>
      <div className="data-error">{ this.state.error }</div>
    </div>
  }
}