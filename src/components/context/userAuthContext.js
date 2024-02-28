import React from "react";

export const userAuthContext = React.createContext({
  authToken: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
