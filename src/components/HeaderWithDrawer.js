import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from '@material-ui/icons/Dashboard'; // Dashboard
import AlarmIcon from '@material-ui/icons/Alarm' // Practice
import SchoolIcon from '@material-ui/icons/School' // Learning
import AssessmentIcon from '@material-ui/icons/Assessment' // Assessment
import { useContext } from "react";
import firebase from "firebase";
import { AuthContext } from "./AuthProvider";
import Button from "@material-ui/core/Button";

import logo from "../assets/bl_logo.png";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
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
    padding: theme.spacing(0),
  },
  spacer: {
    marginRight: "auto",
  },
  toolbar: {
    paddingRight: theme.spacing(9),
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 16,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerPaper: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(10),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  logo: {
    maxHeight: "3rem",
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

  const {currentUser} = useContext(AuthContext);

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

export default function HeaderWithDrawer(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const icons = [<DashboardIcon />, <SchoolIcon />, <AlarmIcon />, <AssessmentIcon/>];
  const addresses = ['/dashboard', '/learning', '/practice', '/assessment'];
  const labels = ['Dashboard', 'Learn', 'Practice', 'Assessments'];
  const [tempOpen, setTempOpen] = React.useState(false);
  const drawerTimer = React.useRef();

  React.useEffect(() => () => {
      clearTimeout(drawerTimer.current);
    },
    [],
  );

  const handleDrawerOpen = () => {
    setOpen(true);
    setTempOpen(false);
  };
  const handleDrawerClose = () => {
    setOpen(false);
    setTempOpen(false);
  };

  const hoverDrawerOpen = () => {
    drawerTimer.current = window.setTimeout(() => {
      if(!open) {
        handleDrawerOpen();
        setTempOpen(true);
      }
    }, 140);
  };
  const hoverDrawerClose = () => {
    if(!open) clearTimeout(drawerTimer.current);
    else if (tempOpen) {
      handleDrawerClose();
    }
    setTempOpen(false);
  };
  
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
            <Button href='/' size="large"><img className={classes.logo} src={logo} alt="Logo"/></Button>
            <div style={{width: "1%"}} />
            <Divider dark orientation="vertical" flexItem />
            <div style={{width: "1.5%"}} />
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              {props.location}
            </Typography>
          <div className={classes.spacer} />
          <LoginLinks />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerPaper]: open, 
          [classes.drawerPaperClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerPaper]: open,
            [classes.drawerPaperClose] : !open
          })
        }}
        open={open}
        onMouseEnter={hoverDrawerOpen}
        onMouseLeave={hoverDrawerClose}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div style={{height: "0.21em"}} />
        <List style={{paddingLeft: "0.21em"}}>
        {labels.map((text, index) => (
          <ListItem button key={text} component="a" href={addresses[index]}>
            <ListItemIcon>
            <div style={{width: "8%"}} />
              {icons[index]}
            </ListItemIcon>
            <ListItemText style={{paddingLeft: "0.5em"}} primary={text} />
          </ListItem>
        ))}
        </List>
      </Drawer>
    </React.Fragment>
  );
}