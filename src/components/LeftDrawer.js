import React from 'react';
import { IconButton, Drawer, List, /* Divider, */ ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import HomeIcon from '@material-ui/icons/Home'; // React
import DashboardIcon from '@material-ui/icons/Dashboard'; // Material
// import ExitToAppIcon from '@material-ui/icons/ExitToApp'; // Log Out
import ExploreIcon from '@material-ui/icons/Explore'; // Log In
import PersonAddIcon from '@material-ui/icons/PersonAdd'; // Register
import ShortTextIcon from '@material-ui/icons/ShortText'; // Example
import MenuIcon from '@material-ui/icons/Menu';
import AssessmentIcon from '@material-ui/icons/Assessment';

const useStyles = makeStyles({
  list: {
      width: 300,
  },
  fullList: {
    width: 'auto',
  },
});

export default function LeftDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const icons = [<HomeIcon />, <ExploreIcon />, <PersonAddIcon />, <ShortTextIcon />, <DashboardIcon />, <AssessmentIcon />];
  const addresses = ['/', '/login', '/register', '/example', '/material', '/quiz'];

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open});
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Home', 'Login', 'Register', 'Example', 'Material', 'Quiz'].map((text, index) => (
          <ListItem button key={text} component="a" href={addresses[index]}>
            <ListItemIcon>
              {icons[index]}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton 
            onClick={toggleDrawer(anchor, true)} 
            edge="start" 
            color="inherit" 
            aria-label="menu"
          >
            <MenuIcon fontSize="default" />
          </IconButton>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}