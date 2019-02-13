import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../routes/Home';
import TV from '../routes/TV';
import Search from '../routes/Search';
import Detail from '../routes/Detail';
import Header from './Header';

const Router: React.FunctionComponent = () => (
  <HashRouter>
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/tv" component={TV} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/movie/:id" component={Detail} />
        <Route exact path="/show/:id" component={Detail} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </HashRouter>
);

export default Router;
