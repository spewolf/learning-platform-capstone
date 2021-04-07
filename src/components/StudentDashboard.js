import React, { useEffect, useContext } from 'react';
import { Container, Paper, Link, Accordion, AccordionSummary, 
         AccordionDetails, List, ListItem, ListSubheader, ListItemText 
       } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getAssignmentsForCourse } from "../helpers/DatabaseHelper";
import firebase from "firebase";
import { AuthContext } from "./AuthProvider";

import * as names from '../LearningModuleNames'

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
            <Accordion style={{paddingLeft: "1em"}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Link href="/learning?module=BinToDec" className={classes.heading}>Binary to Decimal Conversion</Link>
              </AccordionSummary>
              <AccordionDetails style={{display: "table"}}>
                <Link href="/learning?module=BinToDec&page=1" style={{display: "table-row"}} button>{names.BinToDec1}</Link>
                <Link href="/learning?module=BinToDec&page=2" style={{display: "table-row"}} button>{names.BinToDec2}</Link>
                <Link href="/learning?module=BinToDec&page=3" style={{display: "table-row"}} button>{names.BinToDec3}</Link>
                <Link href="/learning?module=BinToDec&page=4" style={{display: "table-row"}} button>{names.BinToDec4}</Link>
                <Link href="/learning?module=BinToDec&page=5" style={{display: "table-row"}} button>{names.BinToDec5}</Link>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{paddingLeft: "1em"}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Link href="/learning?module=DecToBin" className={classes.heading}>Decimal to Binary Conversion</Link>
              </AccordionSummary>
              <AccordionDetails style={{display: "table"}}>
                <Link href="/learning?module=DecToBin&page=1" style={{display: "table-row"}} button>{names.DecToBin1}</Link>
                <Link href="/learning?module=DecToBin&page=2" style={{display: "table-row"}} button>{names.DecToBin2}</Link>
                <Link href="/learning?module=DecToBin&page=3" style={{display: "table-row"}} button>{names.DecToBin3}</Link>
                <Link href="/learning?module=DecToBin&page=4" style={{display: "table-row"}} button>{names.DecToBin4}</Link>
                <Link href="/learning?module=DecToBin&page=5" style={{display: "table-row"}} button>{names.DecToBin5}</Link>
                <Link href="/learning?module=DecToBin&page=6" style={{display: "table-row"}} button>{names.DecToBin6}</Link>
                <Link href="/learning?module=DecToBin&page=7" style={{display: "table-row"}} button>{names.DecToBin7}</Link>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{paddingLeft: "1em"}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Link href="/learning?module=Add" className={classes.heading}>Binary Addition</Link>
              </AccordionSummary>
              <AccordionDetails style={{display: "table"}}>
                <Link href="/learning?module=Add&page=1" style={{display: "table-row"}} button>{names.Add1}</Link>
                <Link href="/learning?module=Add&page=2" style={{display: "table-row"}} button>{names.Add2}</Link>
                <Link href="/learning?module=Add&page=3" style={{display: "table-row"}} button>{names.Add3}</Link>
                <Link href="/learning?module=Add&page=4" style={{display: "table-row"}} button>{names.Add4}</Link>
              </AccordionDetails>
            </Accordion>
            <Accordion style={{paddingLeft: "1em"}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Link href="/learning?module=Sub" className={classes.heading}>Binary Subtraction</Link>
              </AccordionSummary>
              <AccordionDetails style={{display: "table"}}>
                <Link href="/learning?module=Sub&page=1" style={{display: "table-row"}} button>{names.Sub1}</Link>
                <Link href="/learning?module=Sub&page=2" style={{display: "table-row"}} button>{names.Sub2}</Link>
                <Link href="/learning?module=Sub&page=3" style={{display: "table-row"}} button>{names.Sub3}</Link>
                <Link href="/learning?module=Sub&page=4" style={{display: "table-row"}} button>{names.Sub4}</Link>
                <Link href="/learning?module=Sub&page=5" style={{display: "table-row"}} button>{names.Sub5}</Link>
                <Link href="/learning?module=Sub&page=6" style={{display: "table-row"}} button>{names.Sub6}</Link>
                <Link href="/learning?module=Sub&page=7" style={{display: "table-row"}} button>{names.Sub7}</Link>
              </AccordionDetails>
            </Accordion>
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