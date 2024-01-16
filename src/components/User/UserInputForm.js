import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./UserInputForm.module.css";
import Button from "../UI/Button";
import Modal from "../UI/Modal";

const UserInputForm = (props) => {
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [error, setError] = useState();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (userName.trim().length === 0 || userAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age (non-empty value)",
      });
      return;
    }
    if (+userAge < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age ( > 0)",
      });
      return;
    }
    const userObj = {
      id: Math.random().toString(),
      name: userName,
      age: userAge,
    };
    props.onAddUser(userObj);
    setUserName("");
    setUserAge("");
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <Modal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={userName || ""}
            onChange={(event) => setUserName(event.target.value)}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            type="number"
            id="age"
            value={userAge || ""}
            onChange={(event) => setUserAge(event.target.value)}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default UserInputForm;
