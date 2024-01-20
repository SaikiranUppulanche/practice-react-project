import React, { useRef, useState } from "react";
import Card from "../UI/Card";
import classes from "./UserInputForm.module.css";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import Wrapper from "../Helper/Wrapper";

const UserInputForm = (props) => {
  // const [userName, setUserName] = useState("");
  // const [userAge, setUserAge] = useState("");
  const [error, setError] = useState();
  const inputNameRef = useRef();
  const inputAgeRef = useRef();
  const inputCollegeRef = useRef();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const enteredName = inputNameRef.current.value;
    const enteredAge = inputAgeRef.current.value;
    const enteredCollege = inputCollegeRef.current.value;

    if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age (non-empty value)",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age ( > 0)",
      });
      return;
    }
    const userObj = {
      id: Math.random().toString(),
      name: enteredName,
      age: enteredAge,
      college: enteredCollege,
    };
    props.onAddUser(userObj);
    // setUserName("");
    // setUserAge("");
    inputNameRef.current.value = "";
    inputAgeRef.current.value = "";
    inputCollegeRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
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
            // id="username"
            // value={userName || ""}
            // onChange={(event) => setUserName(event.target.value)}
            ref={inputNameRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            type="number"
            id="age"
            // value={userAge || ""}
            // onChange={(event) => setUserAge(event.target.value)}
            ref={inputAgeRef}
          />
          <label htmlFor="college">College Name</label>
          <input
            type="text"
            id="college"
            // value={userAge || ""}
            // onChange={(event) => setUserAge(event.target.value)}
            ref={inputCollegeRef}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default UserInputForm;
