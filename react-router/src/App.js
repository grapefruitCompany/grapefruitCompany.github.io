import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Todos from './components/Todos';
// import AddTodo from './components/AddTodo';

// import About from './components/pages/About';
// import axios from 'axios';

import Header from './components/layout/Header';
import Contacts from './components/pages/Contacts';
import Users from './components/pages/Users';
import Page404 from './components/pages/Page404';

import './App.css';

class App extends Component {
  state = {
    users: []
  }
  
  render() {
    return (
      <Router>
        <div>
            <Header />
            <Switch>
              <Route exact path="/" render={props => (
                <React.Fragment>
                  <h1>Hoy, welcome to my home page!</h1>               
                </React.Fragment>
              )} />
              <Route path="/contacts" component={Contacts} />
              <Route path="/users" component={Users} />
              <Route path="*" component={Page404} />
            </Switch>
        </div>  
      </Router>
    );
  }
}

export default App;
