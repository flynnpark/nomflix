import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from 'routes/Home';

export default () => (
  <Router>
    <Route exact path="/" component={Home} />
  </Router>
);
