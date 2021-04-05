import { AuthContext } from "./AuthProvider.js";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Card, Divider } from "@material-ui/core";
import { AccountBox } from "@material-ui/icons";

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
    padding: "1rem",
  },
}));

export default function ProfilePage(props) {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();

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
        <form className={classes.form} noValidate>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Save new password
          </Button>
        </form>
      </Card>
    </Container>
  );
}
