import React, { Component } from 'react';
import UserList from '../containers/user-list';
import UserDetail from '../containers/user-detail';
import '../scss/main.scss';

class App extends Component {
  render() {
    return (
      <div>
        <h2>Username list:</h2>
        <UserList />
        <hr/>
        <h2>User Details</h2>
        <UserDetail />
      </div>
    );
  }
}

export default App;
