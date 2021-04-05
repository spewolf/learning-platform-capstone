import { AuthContext } from "./AuthProvider.js";
import React, { useContext } from "react";
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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
}));

const WarnButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button);

export default function ProfilePage(props) {
  const app = firebase.apps[0];
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  function handleNewPassword(e) {
    console.log(e);
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
            margin="normal"
            required
            fullWidth
            id="email"
            label="New password"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <WarnButton
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
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
