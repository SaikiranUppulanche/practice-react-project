import React, { useState } from "react";
import UserInputForm from "./components/User/UserInputForm";
import UserList from "./components/User/UserList";

const App = () => {
  const [usersList, setUsersList] = useState([]);
  const handleOnAddUser = (userObj) => {
    setUsersList((prevUsersList) => {
      return [...prevUsersList, userObj];
    });
  };

  return (
    <>
      <UserInputForm onAddUser={handleOnAddUser} />
      <UserList usersList={usersList} />
    </>
  );
};

export default App;
