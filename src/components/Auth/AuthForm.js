import { useState, useRef, useContext } from "react";

import classes from "./AuthForm.module.css";
import { userAuthContext } from "../context/userAuthContext";

const AuthForm = () => {
  const userAuthCtx = useContext(userAuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [loader, setLoader] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitUserCredentials = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setLoader(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA0K8p5KNVmMPUTOloxQXJ7omcZKn36EvI";

      // fetch(
      //   url,
      //   {
      //     method: "POST",
      //     body: JSON.stringify({
      //       email: enteredEmail,
      //       password: enteredPassword,
      //       returnSecureToken: true,
      //     }),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // ).then((res) => {
      //   setLoader(false);
      //   if (res.ok) {
      //     return res.json().then((data) => addAuthToken(data.idToken));
      //   } else {
      //     return res.json().then(alert("Authentication Failed"));
      //   }
      // });
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA0K8p5KNVmMPUTOloxQXJ7omcZKn36EvI";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setLoader(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMsg = "Authentication Failed";
            if (data && data.error && data.error.message) {
              errorMsg = data.error.message;
            }
            throw new Error(errorMsg);
          });
        }
      })
      .then((data) => {
        userAuthCtx.login(data.idToken);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitUserCredentials}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!loader && (
            <button type="submit">
              {isLogin ? "Login" : "Create Account"}
            </button>
          )}
          {loader && <p>Sending request</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
