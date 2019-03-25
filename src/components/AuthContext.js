import React, {useReducer, useEffect} from "react";
import auth from "../lib/auth";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  currentUser: null
};

function reducer(state, action) {
  switch (action.type) {
    case "auth_change":
      return {
        ...initialState,
        isInitialized: true,
        isAuthenticated: !!action.payload,
        currentUser: action.payload
      };
    case "profile_change":
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload
        }
      };
    default:
      throw new Error();
  }
}

const Context = React.createContext(initialState);
export default Context;

export const {Provider: AuthProvider, Consumer} = Context;

export function Provider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleAuthChange(change) {
    dispatch({
      type: "auth_change",
      payload: change
    });
  }

  function handleProfileChange(change) {
    dispatch({
      type: "profile_change",
      payload: change
    });
  }

  useEffect(() => {
    const unsubscribeAuthChange = auth.onAuthStateChanged(handleAuthChange);
    const unsubscribeProfileUpdate = auth.onProfileUpdate(handleProfileChange);
    return () => {
      unsubscribeAuthChange();
      unsubscribeProfileUpdate();
    };
  }, []);

  if (!state.isInitialized) {
    return null;
  }

  return <AuthProvider value={state}>{children}</AuthProvider>;
}
