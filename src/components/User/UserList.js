import React from "react";
import Card from "../UI/Card";
import classes from "./UsersList.module.css";
const UserList = (props) => {
  if (props.usersList.length === 0) {
    return;
  }
  return (
    <Card className={classes.users}>
      <ul>
        {props.usersList.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age} Years old) in {user.college} College
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UserList;
