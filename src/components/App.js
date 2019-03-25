import React from "react";

import {Provider as AuthProvider} from "./AuthContext";
import Router from "./Router";

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
