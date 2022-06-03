//import react
import React from "react";

import { Router, Route, Switch } from "react-router-dom";

import { createBrowserHistory } from "history";

//import component Register
import Register from "./pages/Register";

//import component Login
import Login from "./pages/Login";

//import component Register
import Dashboard from "./pages/admin/Dashboard";

import CreateClass from "./pages/admin/CreateClass";

import Class from "./pages/admin/Class";

import User from "./pages/user/user";

import UserClass from "./pages/user/UserClass";

import CreateAssignment from "./pages/admin/CreateAssignment";

import UserAssignment from "./pages/user/UserAssignment";

import Assignment from "./pages/admin/Assignment";

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/CreateClass" component={CreateClass} />
          <Route path="/User" component={User} />
          <Route path="/Class/:id" component={Class} />
          <Route path="/UserClass/:id" component={UserClass} />
          <Route
            path="/:idClass/UserAssignment/:idAs"
            component={UserAssignment}
          />
          <Route path="/:idclass/Assignment/:idAs" component={Assignment} />
          <Route
            path="/:id/CreateAssignment/:idAs/:idAn"
            component={CreateAssignment}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
