import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from '../MainPage';
import ArtObjectDetails from '../ArtObjectDetails';

// import Redirect from 'react-router-dom/es/Redirect';
// import Page404 from '../Page404';


class Routing extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={ MainPage } />
          <Route path="/:objectnumber" component={ ArtObjectDetails } />
        </Switch>
      </main>
    );
  }
}

export default Routing;

// <Route path="/404" component={ Page404 } />
// <Redirect to="/404"/>