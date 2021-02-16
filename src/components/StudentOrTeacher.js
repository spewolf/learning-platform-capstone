import React, { useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "./AuthProvider.js";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Card } from "@material-ui/core";
import { Create, School } from "@material-ui/icons";

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
  cardLink: {
    width: "50%",
    height: "500px",
    display: "block",
    padding: "1rem",
    textDecoration: "none",
  },
  card: {
    height: "100%",
    width: "100%",
    "&:hover": {
      backgroundColor: "#dadada",
    },
    textAlign: "center",
    fontSize: "2rem",
  },
  display: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  icon: {
    width: "100%",
    height: "60%",
  },
}));

const StudentOrTeacher = () => {
  const classes = useStyles();

  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Redirect to="/register" />;
  }

  return (
    <Container component="main" maxWidth="s">
      <div className={classes.paper}>
        <h1>Are you a student or a teacher?</h1>
        <div className={classes.display}>
          <a href="/register/teacher" className={classes.cardLink}>
            <Card variant="outlined" className={classes.card}>
              <School className={classes.icon} />
              <h2>Teacher</h2>
            </Card>
          </a>
          <a href="/register/student" className={classes.cardLink}>
            <Card variant="outlined" className={classes.card}>
              <Create className={classes.icon} />
              <h2>Student</h2>
            </Card>
          </a>
        </div>
      </div>
    </Container>
  );
};

export default withRouter(StudentOrTeacher);
