import React from "react";
import {Redirect} from "@reach/router";

import ctxAuth from "./AuthContext";

function ProtectedRoute({component: Component, ...props}) {
  const {isAuthenticated} = React.useContext(ctxAuth);
  if (!isAuthenticated) {
    return <Redirect to={`/login`} noThrow />;
  }
  return <Component {...props} />;
}

export default ProtectedRoute;
