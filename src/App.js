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

const history = createBrowserHistory();


function App() {
  return (
    <Router history={history}>
    <div>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Dashboard} />
        <Route path="/CreateClass" component={CreateClass} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;