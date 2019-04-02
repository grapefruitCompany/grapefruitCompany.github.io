import React, { Component } from 'react';

import { Header } from "./components/Header";
import { Home } from "./components/Home";

class App extends Component {
  state = {
    homeLink: 'Home',
    homeMounted: true
  }

  onChangeLinkName(newName) {
    this.setState({
      homeLink: newName
    });
  }

  onChangeHomeMounted() {
    this.setState({
      homeMounted: !this.state.homeMounted
    });
  }

  render() {
    let homeComponent = ""
    if (this.state.homeMounted) {
      homeComponent = (
        <Home
          name={'Max'}
          initialAge={27}
          initialLinkName={this.state.homeLink}
          greet={this.onGreet}
          changeLink={this.onChangeLinkName.bind(this)}
        />
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1">
            <Header homeLink={this.state.homeLink} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1">
            { homeComponent }
          </div>
        </div>
        <div className="row">
          <div className="col-xs-10 col-xs-offset-1">
            <button onClick={this.onChangeHomeMounted.bind(this)} className="btn btn-primary">(Un)Mount Home Component</button>
          </div>
        </div>
    </div>
    );
  }
}

export default App;
