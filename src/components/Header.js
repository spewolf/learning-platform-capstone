import React, { useContext } from "react";
import firebase from "firebase";
import { AuthContext } from "./AuthProvider";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, Toolbar } from '@material-ui/core';
import LeftDrawer from './LeftDrawer';

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    flexDirection: "row",
    boxShadow: "0px 0px 5px 1px rgba(0,0,0,.2)",
    position: "sticky",
    zIndex: "5",
    top: "0",
    color: "palette.primary.text",
  },
  navItem: {
    padding: theme.spacing(1.5),
  },
  spacer: {
    marginRight: "auto",
  },
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
    <AppBar position="sticky">
      <Toolbar>
        <LeftDrawer />
        <NavItem href="/">React</NavItem>
        <NavItem href="/example">Example</NavItem>
        <NavItem href="/material">Material</NavItem>

        <div className={classes.spacer}></div>

        <LoginLinks />
      </Toolbar>
    </AppBar>
  );
}
