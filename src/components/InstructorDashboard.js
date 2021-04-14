import React, { useContext, useEffect } from 'react';
import { Container, Paper, IconButton, FormLabel, List, ListItem, 
         ListItemText, Button, Grid, Backdrop, TextField } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from "@material-ui/icons/Create";
import CloseIcon from "@material-ui/icons/Close";
import { getAssignmentsForCourse } from "../helpers/DatabaseHelper";
import firebase from "firebase";
import { AuthContext } from "./AuthProvider";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import {
  generateBinToDecQuestion,
  generateDecToBinQuestion,
  generateAdditionQuestion,
  generateSubtractionQuestion,
  generateGradedAssignment
} from '../helpers/AssignmentGenerator';

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
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [assignmentName, setAssignmentName] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [dateErr, setDateErr] = React.useState(true);
  const [ongoingAssignments, setOngoing] = React.useState([]);
  const [completedAssignments, setCompleted] = React.useState([]);
  const [numBinToDec, setBinToDec] = React.useState("");
  const [numDecToBin, setDecToBin] = React.useState("");
  const [numBinAdd, setBinAdd] = React.useState("");
  const [numBinSub, setBinSub] = React.useState("");
  const [numBTDPts, setBTDPts] = React.useState("");
  const [numDTBPts, setDTBPts] = React.useState("");
  const [numBAPts, setBAPts] = React.useState("");
  const [numBSPts, setBSPts] = React.useState("");
  const [reloading, setReloading] = React.useState(false);
  const { currentUser } = useContext(AuthContext);
  const userCourse = currentUser.data.course;
  const app = firebase.apps[0];
  const db = firebase.firestore(app);

  // These check if there are questions without points or points in a field without questions
  const BTDQErr = ((parseInt(numBinToDec) === 0 || numBinToDec === "") && parseInt(numBTDPts) > 0);
  const BTDPErr = (parseInt(numBinToDec) > 0 && (parseInt(numBTDPts) === 0 || numBTDPts === ""));
  const DTBQErr = ((parseInt(numDecToBin) === 0 || numDecToBin === "") && parseInt(numDTBPts) > 0);
  const DTBPErr = (parseInt(numDecToBin) > 0 && (parseInt(numDTBPts) === 0 || numDTBPts === ""));
  const BAQErr = ((parseInt(numBinAdd) === 0 || numBinAdd === "") && parseInt(numBAPts) > 0);
  const BAPErr = (parseInt(numBinAdd) > 0 && (parseInt(numBAPts) === 0 || numBAPts === ""));
  const BSQErr = ((parseInt(numBinSub) === 0 || numBinSub === "") && parseInt(numBSPts) > 0);
  const BSPErr = (parseInt(numBinSub) > 0 && (parseInt(numBSPts) === 0 || numBSPts === ""));
  const titleErr = assignmentName === "";

  // Submit button is disabled until this becomes true
  const submittable = !((parseInt(numBinToDec) === 0 && parseInt(numDecToBin) === 0 && 
                        parseInt(numBinAdd) === 0 && parseInt(numBinSub) === 0) ||
                        (parseInt(numBTDPts) === 0 && parseInt(numDTBPts) === 0 && 
                        parseInt(numBAPts) === 0 && parseInt(numBSPts) === 0) ||
                        (numBinToDec === "" && numDecToBin === "" && 
                        numBinAdd === "" && numBinSub === "") ||
                        (numBTDPts === "" && numDTBPts === "" && 
                        numBAPts === "" && numBSPts === "") ||
                        dateErr || BTDQErr || BTDPErr || DTBQErr || DTBPErr || 
                        BAQErr || BAPErr || BSQErr || BSPErr || titleErr);
  
  // This will not allow non-numeric characters to be input
  const handleNumInput = (e, setter) => {
    let flag = true;
    for (let i = 0; i < e.target.value.length && flag; i++)
      if (isNaN(e.target.value[i]) || e.target.value[i] === " ") flag = false; 
    if (flag) setter(e.target.value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date < Date.now()) setDateErr(true);
    else setDateErr(false);
  };
  // Opens backdrop
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleName = (e) => {
    setAssignmentName(e.target.value);
  };
  const handleReload = () => {
    setReloading(true);
    handleToggle();
  }
  const handleSubmit = () => {
    let generatorMap = new Map();
    generatorMap.set(generateBinToDecQuestion, {"quantity": numBinToDec, "points": parseInt(numBTDPts)});
    generatorMap.set(generateDecToBinQuestion, {"quantity": numDecToBin, "points": parseInt(numDTBPts)});
    generatorMap.set(generateAdditionQuestion, {"quantity": numBinAdd, "points": parseInt(numBAPts)});
    generatorMap.set(generateSubtractionQuestion, {"quantity": numBinSub, "points": parseInt(numBSPts)});
    const newAssignment = generateGradedAssignment(generatorMap, userCourse, assignmentName, firebase.firestore.Timestamp.fromDate(selectedDate));
    db.collection("assignments").add(newAssignment);
    handleReload();
    setTimeout((() => { window.location.reload(); }), 500);
  };
  const handleClear = () => {
    setAssignmentName("");
    setBinToDec("");
    setDecToBin("");
    setBinAdd("");
    setBinSub("");
    setBTDPts("");
    setDTBPts("");
    setBAPts("");
    setBSPts("");
    setSelectedDate(Date.now());
  };

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
      <Backdrop className={classes.backdrop} open={open || reloading}>
        <form>
          <Paper style={open && !reloading ? {display: "none"} : {}}>
            <h1 style={{padding: "0.9em"}}>Please wait...</h1>
          </Paper>
          <div style={open && !reloading ? {} : {display: "none"}}>
            <Paper style={{padding: "1.5em", paddingBottom: "1.5em", justify: "center", width:"82%"}}>
              <Grid container alignItems="flex-start" justify="space-around">
                <TextField 
                  style={{paddingBottom: "1em", width: "86.5%"}} 
                  onChange={handleName} 
                  placeholder="New Assignment" 
                  defaultValue="" 
                  variant="outlined"
                  value={assignmentName}
                  error={titleErr}
                />

                <IconButton onClick={handleToggle}>
                  <CloseIcon />
                </IconButton>
              </Grid>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-evenly" style={{paddingBottom: "1em"}}>
                  <KeyboardDatePicker
                    variant="outlined"
                    id="date-picker-dialog"
                    value={selectedDate}
                    onChange={handleDateChange}
                    style={{width: "30%"}}
                    format="MM/dd/yyyy"
                    error={dateErr}
                  />
                  <KeyboardTimePicker
                    variant="outlined"
                    id="time-picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    style={{width: "30%"}}
                    error={dateErr}
                  />
                </Grid>
              </MuiPickersUtilsProvider>

              <div className={classes.newAssignmentQuestions}>
                <div style={{width: "40%"}}>
                  <FormLabel label="Binary to Decimal:" value={numBinToDec}>Binary to Decimal:</FormLabel>
                </div>
                <TextField 
                  onChange={(e) => handleNumInput(e, setBinToDec)} 
                  value={numBinToDec} 
                  autoComplete="off" 
                  style={{maxWidth: "50%"}} 
                  id="outlined-basic" 
                  placeholder="# Questions" 
                  variant="outlined" 
                  error={BTDQErr}
                />
                <TextField 
                  onChange={(e) => handleNumInput(e, setBTDPts)} 
                  value={numBTDPts} 
                  autoComplete="off" 
                  style={{maxWidth: "12%"}} 
                  placeholder="Pts" 
                  variant="outlined" 
                  error={BTDPErr}
                />
              </div>
              <div className={classes.newAssignmentQuestions}>
                <div style={{width: "40%"}}>
                  <FormLabel label="Decimal to Binary:" value={numDecToBin}>Decimal to Binary:</FormLabel>
                </div>
                <TextField 
                  onChange={(e) => handleNumInput(e, setDecToBin)} 
                  value={numDecToBin} 
                  autoComplete="off" 
                  style={{maxWidth: "50%"}} 
                  id="outlined-basic" 
                  placeholder="# Questions" 
                  variant="outlined" 
                  error={DTBQErr}
                />
                <TextField 
                  onChange={(e) => handleNumInput(e, setDTBPts)} 
                  value={numDTBPts} 
                  autoComplete="off" 
                  style={{maxWidth: "12%"}} 
                  placeholder="Pts" 
                  variant="outlined"
                  error={DTBPErr} 
                />
              </div>
              <div className={classes.newAssignmentQuestions}>
                <div style={{width: "40%"}}>
                  <FormLabel label="Binary Addition:" value={numBinAdd}>Binary Addition:</FormLabel>
                </div>
                <TextField 
                  onChange={(e) => handleNumInput(e, setBinAdd)} 
                  value={numBinAdd} 
                  autoComplete="off" 
                  style={{maxWidth: "50%"}} 
                  id="outlined-basic" 
                  placeholder="# Questions" 
                  variant="outlined" 
                  error={BAQErr}
                />
                <TextField 
                  onChange={(e) => handleNumInput(e, setBAPts)} 
                  value={numBAPts} 
                  autoComplete="off" 
                  style={{maxWidth: "12%"}} 
                  placeholder="Pts" 
                  variant="outlined" 
                  error={BAPErr}
                />
              </div>
              <div className={classes.newAssignmentQuestions}>
                <div style={{width: "40%"}}>
                  <FormLabel label="Binary Subtraction" value={numBinSub}>Binary Subtraction:</FormLabel>
                </div>
                <TextField 
                  onChange={(e) => handleNumInput(e, setBinSub)} 
                  value={numBinSub} 
                  autoComplete="off" 
                  style={{maxWidth: "50%"}} 
                  id="outlined-basic" 
                  placeholder="# Questions" 
                  variant="outlined" 
                  error={BSQErr}
                  />
                <TextField 
                  onChange={(e) => handleNumInput(e, setBSPts)} 
                  value={numBSPts} 
                  autoComplete="off" 
                  style={{maxWidth: "12%"}} 
                  placeholder="Pts" 
                  variant="outlined" 
                  error={BSPErr}
                  />
              </div>
              <div style={{padding: "0.5em"}} />
              <Grid container alignItems="flex-start" justify="space-between">
                <Button onClick={handleClear} variant="contained">Clear</Button>
                <Button onClick={handleSubmit} style={{marginRight:"0.4em"}} variant="contained" color="primary" disabled={!submittable}>Submit</Button>
              </Grid>
            </Paper>
          </div>
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
              <List className={classes.root}>
                {ongoingAssignments.map((a) => 
                  <ListItem button component="a" href={`/stats?assignment=${a.id}`}>
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
          <div style={{width: "4%"}} />
          <div style={{width: "43%"}}>
            <Paper elevation={3}>
              <h1 style={{paddingLeft: "0.9em", paddingTop: "0.6em"}}>Completed</h1>
              <List className={classes.root}>
                {completedAssignments.map((a) => 
                  <ListItem button component="a" href={`/stats?assignment=${a.id}`}>
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
    </div>
  );
}