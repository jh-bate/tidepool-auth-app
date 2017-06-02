import React from 'react'

export default class Profile extends React.Component {
  render() {
    return <div className="header">
      <h3>Profile</h3>
      <style jsx>{`
        .header {
          font: 15px Monaco;
          text-align: center;
        }
      `}</style>
    </div>
  }
}