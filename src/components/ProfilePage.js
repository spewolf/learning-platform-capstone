import { AuthContext } from "./AuthProvider.js";
import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Card, Divider } from "@material-ui/core";
import { AccountBox } from "@material-ui/icons";
import firebase from "firebase";
import { red } from "@material-ui/core/colors";

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  profileCard: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    padding: "1rem",
  },
  error: {
    color: "red",
  },
}));

const WarnButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
}))(Button);

export default function ProfilePage(props) {
  const app = firebase.apps[0];
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();

  const [form, setForm] = useState({
    password: null,
    confirmPassword: null,
    errors: {
      password: "required",
      confirmPassword: "required",
    },
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let err = form.errors;

    switch (name) {
      case "newPassword":
        err.password =
          (value?.length ?? 0) < 8 ? "Password must be at least 8 characters long!" : "";
        setForm({ errors: err, password: value, confirmPassword: form.confirmPassword });
        break;
      case "confirmPassword":
        err.confirmPassword =
          value !== form.password ? "Passwords must match!" : "";
        setForm({ errors: err, confirmPassword: value, password: form.password });
        break;
      default:
        break;
    }
  };

  function handleNewPassword(event) {
    event.preventDefault();
    const { newPassword } = event.target.elements;
    currentUser
      .updatePassword(newPassword.value)
      .then(function () {
        app.auth().signOut();
      })
      .catch(function (error) {
        console.log("Update Failed", error);
      });
  }

  if (!currentUser) {
    return <Redirect to="/login"></Redirect>;
  }

  return (
    <Container component="main" maxWidth="md">
      <h1>Profile Page</h1>
      <Card className={classes.profileCard}>
        <CssBaseline />
        <div className={classes.paper}>
          <h1>{currentUser.data?.name}</h1>
          <Avatar className={classes.avatar}>
            <AccountBox />
          </Avatar>
          <h4>{currentUser.data?.type}</h4>
          <p>Course: {currentUser.data?.course}</p>
          <p>Email: {currentUser.email}</p>
        </div>
        <Divider></Divider>
        <form onSubmit={handleNewPassword} className={classes.form} noValidate>
          <h3>Change your password</h3>
          <TextField
            variant="outlined"
            type="password"
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="New password"
            name="newPassword"
            onChange={handleChange}
          />
                        {(form.password?.length ?? 0) > 0 && (
                <span className={classes.error}>{form.errors.password}</span>
              )}
          <TextField
            variant="outlined"
            type="password"
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirm password"
            name="confirmPassword"
            onChange={handleChange}
          />
                        {(form.confirmPassword?.length ?? 0) > 0 && (
                <span className={classes.error}>{form.errors.confirmPassword}</span>
              )}
          <WarnButton
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            disabled={!validateForm(form.errors)}
          >
            Save new password
          </WarnButton>
        </form>
        <Divider></Divider>
        <h3>Sign out</h3>
        <WarnButton
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
          onClick={() => app.auth().signOut()}
        >
          Sign out of Binary Learning
        </WarnButton>
      </Card>
    </Container>
  );
}
