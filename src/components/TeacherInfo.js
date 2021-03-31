import React, { useCallback, useContext } from "react";
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

import { isCourseNameUnique } from '../helpers/DatabaseHelper'

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
}));

const TeacherInfo = ({ history }) => {
  const app = firebase.apps[0];
  const db = firebase.firestore(app);

  const classes = useStyles();

  const { currentUser } = useContext(AuthContext);

  const handleSubmitInfo = useCallback(
    async (event) => {
      event.preventDefault();
      const { name, course } = event.target.elements;
      const type = "instructor";

      // Make sure course name does not already exist.  THIS IS IMPORTANT.
      const isUniquePromise = isCourseNameUnique(db, course.value)
      isUniquePromise.then(async (isUnique) => {
        if (isUnique) {
          try {
            const data = {
              name: name.value,
              course: course.value,
              type: type
            }
            await db.collection("users").doc(currentUser.uid).set(data);
            currentUser.data = data;
            history.push("/");
          } catch (error) {
            alert(error);
          }
        } else {
          alert("Error: That course name already exists.")
        }
      })
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
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="course"
            label="Course Code"
            id="course"
          />
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
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default withRouter(TeacherInfo);
