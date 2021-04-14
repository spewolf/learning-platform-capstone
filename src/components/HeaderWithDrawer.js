import React, { useContext, useCallback } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard"; // Dashboard
import AlarmIcon from "@material-ui/icons/Alarm"; // Assessment
import SchoolIcon from "@material-ui/icons/School"; // Learning
import AssessmentIcon from "@material-ui/icons/Assessment"; // Statistics
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects"; // Practice
import GradeIcon from '@material-ui/icons/Grade'; // Grades
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium'; // Dark/Light toggle
import { AuthContext } from "./AuthProvider.js";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import logo from "../assets/bl_logo.png";
import firebase from "firebase";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.2)",
    position: "sticky",
    zIndex: "5",
    top: "0",
  },
  navItem: {
    padding: theme.spacing(1),
    color: theme.palette.primary.contrastText,
  },
  spacer: {
    marginRight: "auto",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.primary[theme.palette.theme === "dark" ? "main" : "main"], // Change as needed
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
    },
  menuButton: {
    marginRight: 16,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    color: theme.palette.primary.contrastText,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerPaper: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(10),
    },
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  logo: {
    maxHeight: "2.25rem",
    marginTop: ".5rem",
    paddingRight: "2rem",
    paddingLeft: "1rem",
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
  const { currentUser } = useContext(AuthContext);
  let loginLinks;

  if (currentUser) {
    loginLinks = <NavItem href="/profile">Welcome {currentUser.data?.name.split(" ")[0] ?? ""}</NavItem>;
  } else {
    loginLinks = (
      <React.Fragment>
        <NavItem href="/login">Login</NavItem>
        <NavItem href="/register">Register</NavItem>
      </React.Fragment>
    );
  }

  return <React.Fragment>{loginLinks}</React.Fragment>;
}

export default function HeaderWithDrawer(props) {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  let userType = "";
  if (currentUser) {
    userType = currentUser.data?.type;
  }
  const [open, setOpen] = React.useState(false);
  const icons = (userType === "instructor" ? [<DashboardIcon />, <SchoolIcon />, <EmojiObjectsIcon />, <AssessmentIcon />, <GradeIcon />] : [<DashboardIcon />, <SchoolIcon />, <EmojiObjectsIcon />, <AlarmIcon />]);
  const addresses = (userType === "instructor" ? ["/dashboard", "/learning", "/practice", "/pickStats", "/pickGrades"] : ["/dashboard", "/learning", "/practice", "/assessment"]);
  const labels = (userType === "instructor" ? ["Dashboard", "Learn", "Practice", "Statistics", "Grades"] : ["Dashboard", "Learn", "Practice", "Assessments"]);
  const [tempOpen, setTempOpen] = React.useState(false);
  const drawerTimer = React.useRef();
  const app = firebase.apps[0];
  const db = firebase.firestore(app);
  if (currentUser) props.handleSetTheme((currentUser.data?.theme === "light" || currentUser.data?.theme === "") ? "light" : "dark");

  React.useEffect(
    () => () => {
      clearTimeout(drawerTimer.current);
    },
    []
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
      if (!open) {
        handleDrawerOpen();
        setTempOpen(true);
      }
    }, 140);
  };
  const hoverDrawerClose = () => {
    if (!open) clearTimeout(drawerTimer.current);
    else if (tempOpen) {
      handleDrawerClose();
    }
    setTempOpen(false);
  };
  const handleThemeClick = useCallback(
    async (e) => {
      await db.collection("users").doc(currentUser.uid).update(currentUser && (currentUser.data?.theme === "light" || currentUser.data?.theme === "") ? {theme: "dark"} : {theme: "light"});
      if (currentUser) props.handleSetTheme((currentUser.data?.theme === "light" || currentUser.data?.theme === "") ? "dark" : "light")
      window.location.reload();
    },
    [db, currentUser, props]
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar color="inherit" position="fixed" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.title}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            style={currentUser ? {} : {display: "none"}}
          >
            <MenuIcon />
          </IconButton>
          <a href="/" size="large">
            <img className={classes.logo} src={logo} alt="Logo" />
          </a>
          <div style={{ width: "1%" }} />
          <Divider dark orientation="vertical" flexItem />
          <div style={{ width: "1.5%" }} />
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {props.location}
          </Typography>
          <div className={classes.spacer} />
          <Tooltip title="Toggle dark mode">
            <IconButton color="inherit" onClick={handleThemeClick} style={currentUser ? {} : {display: "none"}}>
              <BrightnessMediumIcon />
            </IconButton>
          </Tooltip>
          <LoginLinks className={classes.title} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerPaper]: open,
          [classes.drawerPaperClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerPaper]: open,
            [classes.drawerPaperClose]: !open,
          }),
        }}
        open={open}
        onMouseEnter={hoverDrawerOpen}
        onMouseLeave={hoverDrawerClose}
        style={userType !== "" ? {} : {display: "none"}}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose} style={{color: "inherit"}}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div style={{ height: "0.21em" }} />
        <List style={{ paddingLeft: "0.21em" }}>
          {labels.map((text, index) => (
            <ListItem button key={text} component="a" href={addresses[index]}>
              <ListItemIcon style={{color: "inherit"}}>
                <div style={{ width: "8%" }} />
                {icons[index]}
              </ListItemIcon>
              <ListItemText style={{ paddingLeft: "0.5em" }} primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </React.Fragment>
  );
}
