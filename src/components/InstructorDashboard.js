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

import {
  generateBinToDecQuestion,
  generateDecToBinQuestion,
  generateAdditionQuestion,
  generateSubtractionQuestion,
  generateGradedAssignment
} from '../helpers/AssignmentGenerator'

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

export default function InstructorDashboard(props) {
  // DAVID!  THIS IS HOW YOU CAN NOW GENERATE ASSIGNMENTS :D

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [assignmentName, setAssignmentName] = React.useState("");
  const [ongoingAssignments, setOngoing] = React.useState([]);
  const [completedAssignments, setCompleted] = React.useState([]);
  const [numBinToDec, setBinToDec] = React.useState("0");
  const [numDecToBin, setDecToBin] = React.useState("0");
  const [numBinAdd, setBinAdd] = React.useState("0");
  const [numBinSub, setBinSub] = React.useState("0");
  const [numBTDPts, setBTDPts] = React.useState("0");
  const [numDTBPts, setDTBPts] = React.useState("0");
  const [numBAPts, setBAPts] = React.useState("0");
  const [numBSPts, setBSPts] = React.useState("0");

  // TODO: Relegate this to respective error functions
  const submittable = !(isNaN(parseInt(numBinToDec)) || isNaN(parseInt(numDecToBin)) || 
                        isNaN(parseInt(numBinAdd)) || isNaN(parseInt(numBinSub)) || 
                        (parseInt(numBinToDec) === 0 && parseInt(numDecToBin) === 0 && 
                        parseInt(numBinAdd) === 0 && parseInt(numBinSub) === 0) ||
                        parseInt(numBinToDec) < 0 ||  parseInt(numDecToBin) < 0 ||
                        parseInt(numBinAdd) < 0 ||  parseInt(numBinSub) < 0 ||
                        assignmentName === "" || isNaN(parseInt(numBTDPts)) ||
                        isNaN(parseInt(numDTBPts)) || isNaN(parseInt(numBAPts)) ||
                        isNaN(parseInt(numBSPts)) || parseInt(numBTDPts) < 0 ||
                        parseInt(numDTBPts) < 0 || parseInt(numBAPts) < 0 ||
                        parseInt(numBSPts) < 0 || (parseInt(numBTDPts) === 0 &&
                        parseInt(numDTBPts) === 0 && parseInt(numBAPts) === 0 &&
                        parseInt(numBSPts) === 0));

  const handleToggle = () => {
    setOpen(!open);
  };
  const handleName = (e) => {
    setAssignmentName(e.target.value);
  };
  const handleSubmit = (e) => {
    let generatorMap = new Map();
    generatorMap.set(generateBinToDecQuestion, {"quantity": numBinToDec, "points": numBTDPts});
    generatorMap.set(generateDecToBinQuestion, {"quantity": numDecToBin, "points": numDTBPts});
    generatorMap.set(generateAdditionQuestion, {"quantity": numBinAdd, "points": numBAPts});
    generatorMap.set(generateSubtractionQuestion, {"quantity": numBinSub, "points": numBSPts});
    const newAssignment = generateGradedAssignment(generatorMap, "Course Name", "Title");
  };
  const handleBinToDec = (e) => {
    if (e.target.value === "") setBinToDec("0");
    else setBinToDec(e.target.value);
  };
  const handleDecToBin = (e) => {
    if (e.target.value === "") setDecToBin("0");
    else setDecToBin(e.target.value);
  };
  const handleBinAdd = (e) => {
    if (e.target.value === "") setBinAdd("0");
    else setBinAdd(e.target.value);
  };
  const handleBinSub = (e) => {
    if (e.target.value === "") setBinSub("0");
    else setBinSub(e.target.value);
  };
  const handleBTDPts = (e) => {
    if (e.target.value === "") setBTDPts("0");
    else setBTDPts(e.target.value);
  }
  const handleDTBPts = (e) => {
    if (e.target.value === "") setDTBPts("0");
    else setDTBPts(e.target.value);
  }
  const handleBAPts = (e) => {
    if (e.target.value === "") setBAPts("0");
    else setBAPts(e.target.value);
  }
  const handleBSPts = (e) => {
    if (e.target.value === "") setBSPts("0");
    else setBSPts(e.target.value);
  }
  // const emptyAssignment = {
  //   "uid": "",
  //   "type": "",
  //   "due": "",
  //   "course": "",
  //   "title": "",
  //   "questions": [
  //     {"content": ""}
  //   ]
  // };
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
          <Paper style={{padding: "1.5em", paddingBottom: "2em", justify: "center", width:"82%"}}>
            <Grid container alignItems="flex-start" justify="space-between">
              <TextField style={{paddingBottom: "1em", width: "86.5%"}} onChange={handleName} placeholder="New Assignment" defaultValue="" variant="outlined"/>
              <IconButton onClick={handleToggle}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <div className={classes.newAssignmentQuestions}>
              <div style={{width: "40%"}}>
                <FormLabel label="Binary to Decimal:" value={numBinToDec}>Binary to Decimal:</FormLabel>
              </div>
              <TextField onChange={handleBinToDec} style={{maxWidth: "50%"}} id="outlined-basic" placeholder="# Questions" variant="outlined" />
              <TextField onChange={handleBTDPts} style={{maxWidth: "12%"}} placeholder="Pts" variant="outlined" />
            </div>
            <div className={classes.newAssignmentQuestions}>
              <div style={{width: "40%"}}>
                <FormLabel label="Decimal to Binary:" value={numDecToBin}>Decimal to Binary:</FormLabel>
              </div>
              <TextField onChange={handleDecToBin} style={{maxWidth: "50%"}} id="outlined-basic" placeholder="# Questions" variant="outlined" />
              <TextField onChange={handleDTBPts} style={{maxWidth: "12%"}} placeholder="Pts" variant="outlined" />
            </div>
            <div className={classes.newAssignmentQuestions}>
              <div style={{width: "40%"}}>
                <FormLabel label="Binary Addition:" value={numBinAdd}>Binary Addition:</FormLabel>
              </div>
              <TextField onChange={handleBinAdd} style={{maxWidth: "50%"}} id="outlined-basic" placeholder="# Questions" variant="outlined" />
              <TextField onChange={handleBAPts} style={{maxWidth: "12%"}} placeholder="Pts" variant="outlined" />
            </div>
            <div className={classes.newAssignmentQuestions}>
              <div style={{width: "40%"}}>
                <FormLabel label="Binary Subtraction" value={numBinSub}>Binary Subtraction:</FormLabel>
              </div>
              <TextField onChange={handleBinSub} style={{maxWidth: "50%"}} id="outlined-basic" placeholder="# Questions" variant="outlined" />
              <TextField onChange={handleBSPts} style={{maxWidth: "12%"}} placeholder="Pts" variant="outlined" />
            </div>
            <div style={{padding: "0.5em"}} />
            <Grid container alignItems="flex-start" justify="space-between">
              <Button variant="contained">Cancel</Button>
              <Button onClick={handleSubmit} style={{marginRight:"0.4em"}} variant="contained" type="submit" color="primary" disabled={!submittable}>Submit</Button>
            </Grid>
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