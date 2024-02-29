import { useEffect, useState } from "react";
import { userAuthContext } from "./userAuthContext";

const UserAuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [authToken, setAuthToken] = useState(initialToken);

  const userIsLoggedIn = !!authToken;

  const handleAddToken = (token) => {
    setAuthToken(token);
    localStorage.setItem("token", `${token}`);
  };

  const handleDeleteToken = () => {
    setAuthToken(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleDeleteToken();
      console.log("token cleared");

      return () => {
        clearTimeout(timer);
      };
    }, 5 * 60 * 1000);
  }, []);

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
