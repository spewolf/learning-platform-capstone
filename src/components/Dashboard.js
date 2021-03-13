import React from 'react';
import { Container, Paper, Typography, LinearProgress, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListSubheader, ListItemText } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

export default function Dashboard(props) {
  props.setLocation("Dashboard")

  const classes = useStyles();
  return (
    <Container component="main" className={classes.content} maxWidth="" style={{display: "flex", height: "75vh"}}>
      <div style={{display: "flex", width: "100%", margin: "1em"}}>
        <div style={{width: "3.5%"}} />
        <div style={{width: "43%"}}>
          <Typography>

          </Typography>
          <Paper elevation={3}>
            <h1 style={{paddingLeft: "1em", paddingTop: "0.6em"}}>Learn</h1>
            <Accordion style={{paddingLeft: "1em"}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.header}>Chapter 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Links to individual pages go here
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{paddingLeft: "1em"}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.header}>Chapter 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Links to individual pages go here
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{paddingLeft: "1em"}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.header}>Chapter 3</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Links to individual pages go here
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{paddingLeft: "1em"}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.header}>Chapter 4</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Links to individual pages go here
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </div>
        <div style={{width: "4%"}} />
        <div style={{width: "43%"}}>
          <Paper elevation={3}>
            <h1 style={{paddingLeft: "1em", paddingTop: "0.6em"}}>Assignments</h1>
            <LinearProgress variant="definite" />
            <List className={classes.root} subheader={<ListSubheader style={{paddingLeft: "1.5em"}}>Upcoming</ListSubheader>} >
              <ListItem role={undefined} style={{paddingLeft: "2em"}} button>
                <ListItemText primary="Assignment 1" />
              </ListItem>
              <ListItem style={{paddingLeft: "2em"}} button>
                <ListItemText primary="Assignment 2" />
              </ListItem>
              <ListItem style={{paddingLeft: "2em"}} button disabled>
                <ListItemText primary="Quiz 1" />
              </ListItem>
            </List>
          </Paper>
        </div>
      </div>
    </Container>
  );
}