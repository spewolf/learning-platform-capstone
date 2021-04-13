import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "./AuthProvider.js";
import firebase from "firebase";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { School } from "@material-ui/icons";

import { isCourseNameUnique } from "../helpers/DatabaseHelper";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  detail: {
    color: "#5a5a5a",
  },
  error: {
    color: "red",
  },
}));

const TeacherInfo = ({ history }) => {
  const app = firebase.apps[0];
  const db = firebase.firestore(app);

  const [form, setForm] = useState({
    course: null,
    name: null,
    errors: {
      course: "",
      name: "",
    },
  });

  const handleChange = (event) => {
    console.log(form)
    event.preventDefault();
    const { name, value } = event.target;
    let err = form.errors;

    switch (name) {
      case "name":
        err.name = value.length > 0 ? "" : "Your name is required";
        setForm({ errors: err, course: form.course, name: value });
        break;
      case "course":
        err.course = value.length > 4 ? "" : "Course code must be at least 5 characters";
        setForm({ errors: err, course: value, name: form.name });
        break;
      default:
        break;
    }
  };

  const classes = useStyles();

  const { currentUser } = useContext(AuthContext);

  const handleSubmitInfo = useCallback(
    async (event) => {
      event.preventDefault();
      const { name, course } = event.target.elements;
      const type = "instructor";

      // Make sure course name does not already exist.  THIS IS IMPORTANT.
      const isUniquePromise = isCourseNameUnique(db, course.value);
      isUniquePromise.then(async (isUnique) => {
        if (isUnique) {
          try {
            const data = {
              name: name.value,
              course: course.value,
              type: type,
            };
            await db.collection("users").doc(currentUser.uid).set(data);
            currentUser.data = data;
            history.push("/");
          } catch (error) {
            alert(error);
          }
        } else {
          alert("Error: That course name already exists.");
        }
      });
    },
    [history, db, currentUser]
  );

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <School />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create your class
        </Typography>
        <form className={classes.form} onSubmit={handleSubmitInfo} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Your Name"
            name="name"
            autoComplete="name"
            onChange={handleChange}
            autoFocus
          />
          {(form.name?.length ?? 0) > 0 && (
            <span className={classes.error}>{form.errors.name}</span>
          )}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="course"
            label="Course Code"
            id="course"
            onChange={handleChange}
          />
          {(form.course?.length ?? 0) > 0 && (
            <span className={classes.error}>{form.errors.course}</span>
          )}

          <Grid container justify="flex-start">
            <Grid item className={classes.detail}>
              Give this code to your students when they sign up
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
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default withRouter(TeacherInfo);
