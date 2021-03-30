import React, { useContext, useEffect } from 'react';
import { Container, Paper, Typography, Accordion, AccordionSummary, 
         AccordionDetails, IconButton, FormLabel, List, ListItem, 
         ListItemText, Link, Button, Grid, Backdrop, TextField } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CreateIcon from "@material-ui/icons/Create";
import CloseIcon from "@material-ui/icons/Close";
import { getAssignmentsForCourse } from "../helpers/DatabaseHelper";
import firebase from "firebase";
import { AuthContext } from "./AuthProvider";

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
    zIndex: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  newAssignmentQuestions: {
    alignItems: "center", 
    display: "flex", 
    justify: "space-around",
  }
}));

// let docQuery = this._db.collection('communityProgramPost');
// const response = await docQuery.get();
// const post = response.docs.map(doc => {
//   const post = doc.data();
//   post.id = doc.id;
//   return post;
// });

export default function InstructorDashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [ongoingAssignments, setOngoing] = React.useState([]);
  const [completedAssignments, setCompleted] = React.useState([]);
  const [numBinToDec, setBinToDec] = React.useState("0");
  const [numDecToBin, setDecToBin] = React.useState("0");
  const [numBinAdd, setBinAdd] = React.useState("0");
  const [numBinSub, setBinSub] = React.useState("0");
  const submittable = !(isNaN(parseInt(numBinToDec)) || isNaN(parseInt(numDecToBin)) || 
                        isNaN(parseInt(numBinAdd)) || isNaN(parseInt(numBinSub)) || 
                        (parseInt(numBinToDec) === 0 && parseInt(numDecToBin) === 0 && 
                        parseInt(numBinAdd) === 0 && parseInt(numBinSub) === 0) ||
                        parseInt(numBinToDec) < 0 ||  parseInt(numDecToBin) < 0 ||
                        parseInt(numBinAdd) < 0 ||  parseInt(numBinSub) < 0);
  const handleToggle = (e) => {
    setOpen(!open);
  };
  const handleSubmit = (e) => {
  };
  const handleBinToDec = (e) => {
    setBinToDec(e.target.value);
  };
  const handleDecToBin = (e) => {
    setDecToBin(e.target.value);
  };
  const handleBinAdd = (e) => {
    setBinAdd(e.target.value);
  };
  const handleBinSub = (e) => {
    setBinSub(e.target.value);
  };
  const emptyAssignment = {
    "uid": "",
    "type": "",
    "due": "",
    "course": "",
    "title": "",
    "questions": [
      {"content": ""}
    ]
  };
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
      });
    }
    getAllAssignments();
  }, [db, userCourse]);

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <form>
          <Paper style={{padding: "2em", paddingTop: "0.5em", justify: "center"}}>
            <Grid container alignItems="center" justify="space-between">
              <h1>New Assignment</h1>
              <IconButton onClick={handleToggle}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <div className={classes.newAssignmentQuestions}>
              <div style={{width: "40%"}}>
                <FormLabel label="Binary to Decimal:" value={numBinToDec}>Binary to Decimal:</FormLabel>
              </div>
              <div style={{width: "1em"}} />
              <TextField onChange={handleBinToDec} id="filled-basic" defaultValue="0" label="Number" variant="filled" />
            </div>
            <div className={classes.newAssignmentQuestions}>
              <div style={{width: "40%"}}>
                <FormLabel label="Decimal to Binary:" value={numDecToBin}>Decimal to Binary:</FormLabel>
              </div>
              <div style={{width: "1em"}} />
              <TextField onChange={handleDecToBin} id="filled-basic" defaultValue="0" label="Number" variant="filled" />
            </div>
            <div className={classes.newAssignmentQuestions}>
              <div style={{width: "40%"}}>
                <FormLabel label="Binary Addition:" value={numBinAdd}>Binary Addition:</FormLabel>
              </div>
              <div style={{width: "1em"}} />
              <TextField onChange={handleBinAdd} id="filled-basic" defaultValue="0" label="Number" variant="filled" />
            </div>
            <div className={classes.newAssignmentQuestions}>
              <div style={{width: "40%"}}>
                <FormLabel label="Binary Subtraction" value={numBinSub}>Binary Subtraction:</FormLabel>
              </div>
              <div style={{width: "1em"}} />
              <TextField onChange={handleBinSub} id="filled-basic" defaultValue="0" label="Number" variant="filled" />
            </div>
            <Button onClick={handleSubmit} variant="contained" type="submit" disabled={!submittable}>Submit</Button>
          </Paper>
        </form>
      </Backdrop>
      <Container component="main" className={classes.content} maxWidth="" style={{display: "flex"}}>
        <div style={{display: "flex", width: "100%", margin: "1em"}}>
          <div style={{width: "3.5%"}} />
          <div style={{width: "43%", display: "stretch"}}>
            <Paper elevation={3} style={{marginTop: "1.35em"}}>
              <Grid 
                container 
                alignItems="baseline" 
                style={{paddingRight: "1.2em", alignItems: "center"}} 
                direction="flex-end" 
                justify="space-between"
              >
                <h1 style={{paddingLeft: "0.9em"}}>Ongoing</h1>
                <Button 
                  startIcon={<CreateIcon />} 
                  variant="contained" 
                  color="primary"
                  onClick={handleToggle}
                >
                  Create
                </Button>
              </Grid>
              {ongoingAssignments.map((a) =>
                <Accordion style={{paddingLeft: "1em", width: "100%"}}>
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.header}>{a.title}</Typography>
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
              )}
            </Paper>
          </div>
          <div style={{width: "4%"}} />
          <div style={{width: "43%"}}>
            <Paper elevation={3}>
              <h1 style={{paddingLeft: "0.9em", paddingTop: "0.6em"}}>Completed</h1>
              {completedAssignments.map((a, index) => (
                <Accordion style={{paddingLeft: "1em", width: "100%"}}>
                  <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.header}>{a.title}</Typography>
                  </AccordionSummary>
                </Accordion>
              ))}
            </Paper>
          </div>
        </div>
      </Container>
    </div>
  );
}