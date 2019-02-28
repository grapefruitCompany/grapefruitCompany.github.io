import React, { Component } from 'react';
import './Styles/main.scss';
import Header from './Components/Header';
import Routing from './Components/Routing';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Routing/>        
      </div>
    );
  }
}

export default App;
