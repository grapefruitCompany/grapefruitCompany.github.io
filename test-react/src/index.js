
//https://youtu.be/wzWZDh0dUYE?t=740

import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';

const initalState = {
  firstName: 'Serge',
  lastName: 'Rumiantsev'
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

class MainComponent extends React.Component {
  render() {
    const dispatch = this.props.dispatch;
    return (
        <div className="App">
          <div>
            <input
              type="text"
              value={ this.props.firstName }
              placeholder="First name"
            />
          </div>
          <div>
            <input
              type="text"
              value={ this.props.lastName }
              placeholder="Last name"
            />
          </div>
          <div></div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    firstName: state.firstName,
    lastName: state.lastName
  }
}

const WrappedMainComponent = connect(mapStateToProps)(MainComponent);

ReactDOM.render(
  <Provider store={ store }>
    <WrappedMainComponent/>
  </Provider>
  , document.getElementById('root'));

