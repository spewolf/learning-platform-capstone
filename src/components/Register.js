import React, { useCallback, useContext, useState } from "react";
import firebase from "firebase";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "./AuthProvider.js";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const validEmailRegex = RegExp(
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
);

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "red",
  },
}));

const Register = (props) => {
  props.setLocation("Register");

  const app = firebase.apps[0];

  const classes = useStyles();
  const [form, setForm] = useState({
    email: null,
    password: null,
    errors: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let err = form.errors;

    switch (name) {
      case "email":
        err.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        setForm({ errors: err, password: form.password, email: value });
        break;
      case "password":
        err.password =
          (value?.length ?? 0) < 8 ? "Password must be at least 8 characters long!" : "";
        setForm({ errors: err, password: value, email: form.email });
        break;
      default:
        break;
    }
  };

  const handleRegistration = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app?.auth().createUserWithEmailAndPassword(email.value, password.value);
        props.history.push("/register/student-or-teacher");
      } catch (error) {
        alert(error);
      }
    },
    [props.history, app]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleRegistration} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
              {(form.email?.length ?? 0) > 0 && <span className={classes.error}>{form.errors.email}</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
              {(form.password?.length ?? 0) > 0 && (
                <span className={classes.error}>{form.errors.password}</span>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!validateForm(form.errors)}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default withRouter(Register);
