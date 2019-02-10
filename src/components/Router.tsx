import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../routes/Home';
import TV from '../routes/TV';
import Search from '../routes/Search';

const Router: React.FunctionComponent = () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/tv" component={TV} />
      <Route exact path="/search" component={Search} />
      <Redirect from="*" to="/" />
    </Switch>
  </HashRouter>
);

export default Router;
