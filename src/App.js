//import react
import React from 'react';

import { Router, Route, Switch } from "react-router-dom";

import { createBrowserHistory } from "history";

//import component Register
import Register from './pages/Register';

//import component Login
import Login from './pages/Login';

//import component Register
import Dashboard from './pages/Dashboard';

import CreateClass from './pages/CreateClass';

import User from './pages/user';

const history = createBrowserHistory();


function App() {
  return (
    <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/CreateClass" component={CreateClass} />
        <Route exact path="/User" component={User} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;