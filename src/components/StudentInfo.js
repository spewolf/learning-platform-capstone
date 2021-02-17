import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "./AuthProvider.js";
import firebase from "firebase";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { School } from "@material-ui/icons";

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
}));

const StudentInfo = ({ history }) => {
  const app = firebase.apps[0];
  const db = firebase.firestore(app);

  const classes = useStyles();

  const { currentUser } = useContext(AuthContext);

  const handleSubmitInfo = useCallback(
    async (event) => {
      event.preventDefault();
      const { name, bgsu_id, course } = event.target.elements;
      const type = "student";
      try {
        const data = {
          name: name.value,
          bgsu_id: bgsu_id.value,
          course: course.value,
          type: type,
        }
        await db.collection("users").doc(currentUser.uid).set(data);
        currentUser.data = data;
        history.push("/");
      } catch (error) {
        alert(error);
      }
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
          Sign up for your class
        </Typography>
        <form className={classes.form} onSubmit={handleSubmitInfo} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="bgsu_id"
            label="Student ID"
            name="bgsu_id"
            autoComplete="name"
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

export default withRouter(StudentInfo);
