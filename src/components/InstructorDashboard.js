import React from 'react';
import { Container, Paper, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, Link } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
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
      <Container component="main" className={classes.content} maxWidth="" style={{display: "flex"}}>
        <div style={{display: "flex", width: "100%", margin: "1em"}}>
          <div style={{width: "3.5%"}} />
          <div style={{width: "43%"}}>
            <Paper elevation={3}>
              <h1 style={{paddingLeft: "0.9em", paddingTop: "0.6em"}}>Ongoing</h1>
              <Accordion style={{paddingLeft: "1em"}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.header}>Assignment 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    <ListItem style={{paddingLeft: "2em"}}>
                      <ListItemText primary="Mean: ">
                        {/* Implement mean */}
                      </ListItemText>
                    </ListItem>
                    <ListItem style={{paddingLeft: "2em"}}>
                      <ListItemText primary="Median: ">
                        {/* Implement median */}
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <Link href="/stats" button>More...</Link>
                    </ListItem>
                  </List>
                </AccordionDetails>
              </Accordion>
              <Accordion style={{paddingLeft: "1em"}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.header}>Assignment 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  
                </AccordionDetails>
              </Accordion>
              <Accordion style={{paddingLeft: "1em"}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.header}>Quiz 1</Typography>
                </AccordionSummary>
                <AccordionDetails>

                </AccordionDetails>
              </Accordion>
            </Paper>
          </div>
          <div style={{width: "4%"}} />
          <div style={{width: "43%"}}>
            <Paper elevation={3}>
              <h1 style={{paddingLeft: "0.9em", paddingTop: "0.6em"}}>Completed</h1>
              <Accordion style={{paddingLeft: "1em"}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.header}>Assignment 0</Typography>
                </AccordionSummary>
              </Accordion>
            </Paper>
          </div>
        </div>
      </Container>
    );
  }