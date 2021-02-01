import React, { useCallback } from "react";
import firebase from "firebase";
import { withRouter } from "react-router";

const Register = ({ history }) => {
  const app = firebase.apps[0];

  const handleRegistration = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app.auth().createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history, app]
  );

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegistration}>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default withRouter(Register);
