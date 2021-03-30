import React from 'react';
import { Container, Paper, Typography, Accordion, AccordionSummary, AccordionDetails, IconButton, FormLabel, List, ListItem, ListItemText, Link, Button, Grid, Backdrop, TextField } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CreateIcon from "@material-ui/icons/Create";
import CloseIcon from "@material-ui/icons/Close";

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

// let docQuery = this._db.collection('communityProgramPost');
// const response = await docQuery.get();
// const post = response.docs.map(doc => {
//   const post = doc.data();
//   post.id = doc.id;
//   return post;
// });

export default function InstructorDashboard(props) {
  // DAVID!  THIS IS HOW YOU CAN NOW GENERATE ASSIGNMENTS :D
  var generatorMap = new Map()
  generatorMap.set(generateBinToDecQuestion, {"quantity": 10, "points": 1})
  generatorMap.set(generateDecToBinQuestion, {"quantity": 1, "points": 10})
  generatorMap.set(generateAdditionQuestion, {"quantity": 5, "points": 3})
  generatorMap.set(generateSubtractionQuestion, {"quantity": 1, "points": 42})
  var newAssignment = generateGradedAssignment(generatorMap, "Course Name", "Title")
  console.log(newAssignment)

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [submittable, setSubmit] = React.useState(false);
  const [numBinToDec, setBinToDec] = React.useState("");
  const [numDecToBin, setDecToBin] = React.useState("");
  const [numBinAdd, setBinAdd] = React.useState("");
  const [numBinSub, setBinSub] = React.useState("");
  const handleToggle = (e) => {
    setOpen(!open);
  };
  const handleSubmittable = () => {
    if (isNaN(parseInt(numBinToDec)) || 
    isNaN(parseInt(numDecToBin)) || 
    isNaN(parseInt(numBinAdd)) || 
    isNaN(parseInt(numBinSub)) || 
    (parseInt(numBinToDec) === 0 && 
    parseInt(numDecToBin) === 0 && 
    parseInt(numBinAdd) === 0 && 
    parseInt(numBinSub) === 0) ||
    parseInt(numBinToDec) < 0 ||
    parseInt(numDecToBin) < 0 ||
    parseInt(numBinAdd) < 0 ||
    parseInt(numBinSub) < 0) setSubmit(false);
    else setSubmit(true);
  };
  const handleSubmit = (e) => {
    // TODO: pass quiz object up to database
  };
  const handleBinToDec = (e) => {
    setBinToDec(e.target.value);
    handleSubmittable();
  };
  const handleDecToBin = (e) => {
    setDecToBin(e.target.value);
    handleSubmittable();
  };
  const handleBinAdd = (e) => {
    setBinAdd(e.target.value);
    handleSubmittable();
  };
  const handleBinSub = (e) => {
    setBinSub(e.target.value);
    handleSubmittable();
  };

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
                <FormLabel label="Binary to Decimal:" value="BinToDec">Binary to Decimal:</FormLabel>
              </div>
              <div style={{width: "1em"}} />
              <TextField onChange={handleBinToDec} id="filled-basic" defaultValue="0" label="Number" variant="filled" />
            </div>
            <div className={classes.newAssignmentQuestions}>
              <div style={{width: "40%"}}>
                <FormLabel label="Decimal to Binary:" value="DecToBin">Decimal to Binary:</FormLabel>
              </div>
              <div style={{width: "1em"}} />
              <TextField onChange={handleDecToBin} id="filled-basic" defaultValue="0" label="Number" variant="filled" />
            </div>
            <div className={classes.newAssignmentQuestions}>
              <div style={{width: "40%"}}>
                <FormLabel label="Binary Addition:" value="BinAdd">Binary Addition:</FormLabel>
              </div>
              <div style={{width: "1em"}} />
              <TextField onChange={handleBinAdd} id="filled-basic" defaultValue="0" label="Number" variant="filled" />
            </div>
            <div className={classes.newAssignmentQuestions}>
              <div style={{width: "40%"}}>
                <FormLabel label="Binary Subtraction" value="BinSub">Binary Subtraction:</FormLabel>
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
              {/* TODO: pull all ongoing assignments from database, map to an accordion */}
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
    </div>
  );
}