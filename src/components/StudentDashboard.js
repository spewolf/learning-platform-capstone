import React, { useEffect, useContext } from 'react';
import { Container, Paper, Link, Accordion, AccordionSummary, 
         AccordionDetails, List, ListItem, ListSubheader, ListItemText 
       } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getAssignmentsForCourse } from "../helpers/DatabaseHelper";
import firebase from "firebase";
import { AuthContext } from "./AuthProvider";

import { Names } from '../LearningModuleNames'

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
}))

export default function StudentDashboard(props) {
  const classes = useStyles();
  const [ongoingAssignments, setOngoing] = React.useState([]);
  const [completedAssignments, setCompleted] = React.useState([]);

  const app = firebase.apps[0];
  const db = firebase.firestore(app);
  const { currentUser } = useContext(AuthContext);
  const userCourse = currentUser.data.course;
  

  useEffect(() => {
    function getAllAssignments() {
      getAssignmentsForCourse(db, userCourse)
      .then((assignments) => {
        let ongoing = [];
        let completed = [];
        assignments.forEach((a) => {
          a.due.toDate() > Date.now() ? ongoing.push(a) : completed.push(a);
        })
        setOngoing(ongoing);
        setCompleted(completed);
      })
    }
    getAllAssignments();
  }, [db, userCourse]);

  return (
    <Container component="main" className={classes.content} maxWidth="" style={{display: "flex"}}>
      <div style={{display: "flex", width: "100%", margin: "1em"}}>
        <div style={{width: "3.5%"}} />
        <div style={{width: "43%"}}>
          <Paper elevation={3}>
            <h1 style={{paddingLeft: "0.9em", paddingTop: "0.6em"}}>Learn</h1>
            {Names.map((module) => {
              return (
                <Accordion style={{paddingLeft: "1em"}}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Link href={"/learning?module=" + module.moduleName} className={classes.heading}>{module.moduleFullName}</Link>
                  </AccordionSummary>
                  <AccordionDetails style={{display: "table"}}>
                    {module.steps.map((stepName, index) => {
                      return <Link href={"/learning?module=" + module.moduleName + "&page=" + (index+1)} style={{display: "table-row"}} button>{stepName}</Link>
                    })}
                  </AccordionDetails>
                </Accordion>
              )
            })}
          </Paper>
        </div>
        <div style={{width: "4%"}} />
        <div style={{width: "43%"}}>
          <Paper elevation={3}>
            <h1 style={{paddingLeft: "0.9em", paddingTop: "0.6em"}}>Assignments</h1>
            <List className={classes.root} subheader={<ListSubheader style={{paddingLeft: "1em"}}>Current</ListSubheader>} >
              {ongoingAssignments.map((a) => 
                <ListItem button component="a" href={`/assessment?id=${a.id}`}>
                  <ListItemText style={{paddingLeft: "1em"}} primary={a.title} />
                  <ListItemText 
                    style={{textAlign: "right", paddingRight: "1em"}} 
                    primary={`${months[a.due.toDate().getMonth()]} ${a.due.toDate().getDate()}`} 
                  />
                </ListItem>
              )}
            </List>
            <List className={classes.root} subheader={<ListSubheader style={{paddingLeft: "1em"}}>Past</ListSubheader>} >
              {completedAssignments.map((a) => 
                <ListItem button disabled component="a">
                  <ListItemText style={{paddingLeft: "1em"}} primary={a.title} />
                  <ListItemText 
                    style={{textAlign: "right", paddingRight: "1em"}} 
                    primary={`${months[a.due.toDate().getMonth()]} ${a.due.toDate().getDate()}`}
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </div>
      </div>
    </Container>
  );
}