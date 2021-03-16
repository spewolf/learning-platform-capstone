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
  }));

  export default function InstructorDashboard(props) {
    const classes = useStyles();
    return (
      <Container component="main" className={classes.content} maxWidth="" style={{display: "flex", height: "75vh"}}>
        <div style={{display: "flex", width: "100%", margin: "1em"}}>
          <div style={{width: "3.5%"}} />
          <div style={{width: "43%"}}>
            <Paper elevation={3}>
              <h1 style={{paddingLeft: "1em", paddingTop: "0.6em"}}>Ongoing</h1>
            </Paper>
          </div>
          <div style={{width: "4%"}} />
          <div style={{width: "43%"}}>
            <Paper elevation={3}>
              <h1 style={{paddingLeft: "1em", paddingTop: "0.6em"}}>Completed</h1>

            </Paper>
          </div>
        </div>
      </Container>
    );
  }