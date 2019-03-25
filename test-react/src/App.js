import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';

const initalState = {
  firstName: '',
  lastName: ''
};

const ACTION_CHANGE_FIRST_NAME = 'ACTION_CHANGE_FIRST_NAME';
const ACTION_CHANGE_LAST_NAME = 'ACTION_CHANGE_LAST_NAME';

const actionChangeFirstName = {
  type: ACTION_CHANGE_FIRST_NAME,
  payload: null
};

const actionChangeLastName = {
  type: ACTION_CHANGE_LAST_NAME,
  payload: null
};

const rootReducer = (state = initalState, action) => {
  return state;
}

const store = createStore(rootReducer);

console.log(store.getState());

class App extends Component {
  render() {
    console.log('Sup, how you doing?');
    return (
      <Provider store={ store }>
        <div className="App">
          <div><input type="text" placeholder="First name"/></div>
          <div><input type="text" placeholder="Last name"/></div>
          <div></div>
        </div>
      </Provider>
    );
  }
}

export default App;
