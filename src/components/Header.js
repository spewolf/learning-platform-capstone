import React, { useContext } from "react";
import firebase from "firebase";
import { AuthContext } from "./AuthProvider";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexDirection: "row",
    boxShadow: "0px 0px 4px 0px rgba(0,0,0,.5)"
  },
  navItem: {
    padding: theme.spacing(1.5),
  },
  spacer: {
    marginRight: "auto",
  },
  title: {
    textDecoration: "none",
    color: "black",
    padding: "auto",
    display: "flex",
    '& h1': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(2),
      marginTop: "auto",
      marginBottom: "auto",
    }
  }
}));

function NavItem(props) {
  const classes = useStyles();

  return (
    <Button href={props.href} onClick={props.onClick}>
      <div className={classes.navItem}>{props.children}</div>
    </Button>
  );
}

function LoginLinks(props) {
  const app = firebase.apps[0];

  const { currentUser } = useContext(AuthContext);

  let loginLinks;

  if (currentUser) {
    loginLinks = (
      <NavItem onClick={() => app.auth().signOut()}>Sign out</NavItem>
    );
  } else {
    loginLinks = (
      <React.Fragment>
        <NavItem href="/login">Login</NavItem>
        <NavItem href="/register">Register</NavItem>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {loginLinks}
    </React.Fragment>
  );
}

export default function Header(props) {

  const classes = useStyles();

  return (
    <header className={classes.header}>
      <a href="/" className={classes.title}>
        <h1 >Binary Learning</h1>
      </a>
      <NavItem href="/">React</NavItem>
      <NavItem href="/example">Example</NavItem>
      <NavItem href="/material">Material</NavItem>

      <div className={classes.spacer}></div>

      <LoginLinks />
    </header>
  );
}
