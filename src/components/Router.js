import React from "react";
import {Router, Redirect} from "@reach/router";

import ctxAuth from "./AuthContext";
import Protected from "./ProtectedRoute";

import Home from "../pages/Home";
import Entry from "../pages/Entry";
import Register from "../pages/Register";
import Login from "../pages/Login";

function Routes() {
  const {isAuthenticated} = React.useContext(ctxAuth);
  return (
    <Router>
      <Protected component={Home} path="/" />
      <Protected component={Entry} path="/entries/:entryID" />
      {isAuthenticated
        ? [
            <Redirect from="/login" to="/" key="/login" noThrow />,
            <Redirect from="/register" to="/" key="/register" noThrow />
          ]
        : [
            <Login path="/login" key="/login" />,
            <Register path="/register" key="/register" />
          ]}
    </Router>
  );
}

export default Routes;
