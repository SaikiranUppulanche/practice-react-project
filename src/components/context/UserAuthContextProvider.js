import { useState } from "react";
import { userAuthContext } from "./userAuthContext";

const UserAuthContextProvider = (props) => {
  const [authToken, setAuthToken] = useState(null);

  const userIsLoggedIn = !!authToken;

  const handleAddToken = (token) => {
    setAuthToken(token);
    console.log(token);
  };

  const handleDeleteToken = () => {
    setAuthToken(null);
    console.log("deleted token");
  };

  return (
    <userAuthContext.Provider
      value={{
        authToken,
        isLoggedIn: userIsLoggedIn,
        login: handleAddToken,
        logout: handleDeleteToken,
      }}
    >
      {props.children}
    </userAuthContext.Provider>
  );
};

export default UserAuthContextProvider;
