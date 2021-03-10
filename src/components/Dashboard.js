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
  const classes = useStyles();
  return (
    <Container component="main" className={classes.content} maxWidth="" style={{display: "flex", height: "75vh"}}>
      <div className={classes.appBarSpacer} />
      <div style={{display: "flex", width: "100%", margin: "1em"}}>
        <div style={{width: "43%"}}>
          <Typography>

          </Typography>
          <Paper elevation={3}>
            <h1>Learn</h1>
            <Accordion>
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
            <Accordion>
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
            <Accordion>
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
            <Accordion>
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
            <h1>Assignments</h1>
            <LinearProgress variant="definite" />
            <List className={classes.root} subheader={<ListSubheader>Upcoming</ListSubheader>} >
              <ListItem role={undefined} button>
                <ListItemText primary="Assignment 1" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Assignment 2" />
              </ListItem>
              <ListItem button disabled>
                <ListItemText primary="Quiz 1" />
              </ListItem>
            </List>
          </Paper>
        </div>
      </div>
    </Container>
  );
}