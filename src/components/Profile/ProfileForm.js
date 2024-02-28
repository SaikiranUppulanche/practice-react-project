import { useContext, useRef } from "react";
import classes from "./ProfileForm.module.css";
import { userAuthContext } from "../context/userAuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const ProfileForm = () => {
  const enteredPassword = useRef();
  const userAuthCtx = useContext(userAuthContext);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredNewPassword = enteredPassword.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA0K8p5KNVmMPUTOloxQXJ7omcZKn36EvI",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: userAuthCtx.authToken,
          password: enteredNewPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMsg = "Failed to update password";
            console.log(data);
            throw new Error(errorMsg);
          });
        }
      })
      .then((data) => {
        console.log(data);
        history.replace("/");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          required
          ref={enteredPassword}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
