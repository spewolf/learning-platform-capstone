import React from 'react'

import { Button, Container, FormControlLabel, Input, Paper } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

import Checkbox from './Checkbox.js'

import {
  generateBinToDecQuestion,
  generateDecToBinQuestion,
  generateAdditionQuestion,
  generateSubtractionQuestion,
  generatePracticeAssignment
} from '../helpers/AssignmentGenerator'
import Quiz from './Quiz'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
      paddingLeft: "1em",
      paddingTop: ".6em",
      paddingBottom: ".6em",
      paddingRight: "1em",
      marginBottom: "1em"
  }
}))

export default function PracticeModule(props) {
  props.setLocation("Practice")

  const emptyAssignment = {
    "uid": "",
    "type": "",
    "due": "",
    "course": "",
    "title": "",
    "questions": [
      {"content": ""}
    ]
  }

  const [binToDec, setBinToDec] = React.useState(false)
  const [decToBin, setDecToBin] = React.useState(false)
  const [add, setAdd] = React.useState(false)
  const [sub, setSub] = React.useState(false)
  const [numberOfQuestions, setNumberOfQuestions] = React.useState("")
  const [assignment, setAssignment] = React.useState(emptyAssignment)
  const [showAssignment, setShowAssignment] = React.useState(false)

  const classes = useStyles()

  // Called when the user clicks the "begin" button.
  const begin = (event) => {
    event.preventDefault()

    // Decide which question functions to use.
    const functions = []
    if (binToDec) {
      functions.push(generateBinToDecQuestion)
    }
    if (decToBin) {
      functions.push(generateDecToBinQuestion)
    }
    if (add) {
      functions.push(generateAdditionQuestion)
    }
    if (sub) {
      functions.push(generateSubtractionQuestion)
    }

    setAssignment(generatePracticeAssignment(functions, parseInt(numberOfQuestions)));
    setShowAssignment(true);
  };

  // Checkbox onChange listeners
  function onBinToDecChanged(event) {
    setBinToDec(event.target.checked)
  }
  function onDecToBinChanged(event) {
    setDecToBin(event.target.checked)
  }
  function onAddChanged(event) {
    setAdd(event.target.checked)
  }
  function onSubChanged(event) {
    setSub(event.target.checked)
  }

  // Input onChange listener
  function onInputChanged(event) {
    setNumberOfQuestions(event.target.value)
  }

  return (
    <div>
      <div style={showAssignment ? {display: "none"} : {}}>
        <Container className={classes.container}>
          <form onSubmit={begin}>
              <Paper elevation={3} className={classes.paper}>
                <FormControlLabel style={{display: "block"}} value="BinToDec" control={<Checkbox name="BinToDec" onChange={onBinToDecChanged}/>} label="Binary to Decimal Conversion" />
                <FormControlLabel style={{display: "block"}} value="DecToBin" control={<Checkbox name="DecToBin" onChange={onDecToBinChanged}/>} label="Decimal to Binary Conversion" />
                <FormControlLabel style={{display: "block"}} value="Add" control={<Checkbox name="Add" onChange={onAddChanged}/>} label="Binary Addition" />
                <FormControlLabel style={{display: "block"}} value="Sub" control={<Checkbox name="Sub" onChange={onSubChanged}/>} label="Binary Subtraction" />
                <div style={{display: "flex"}}>
                  <p>How many problems?</p>
                  <Input style={{margin: "1em"}} onChange={onInputChanged}/>
                </div>
              </Paper>
            <Button
              disabled={
                // Disable the button if none of the checkboxes are checked or if the input is NaN.
                !(binToDec || decToBin || add || sub)
                || isNaN(parseInt(numberOfQuestions))
                || numberOfQuestions.length === 0
              }
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Begin
            </Button>
          </form>
        </Container>
      </div>
      <Container className={classes.container} style={showAssignment ? {} : {display: "none"}}>
        <Quiz assignment={assignment}/>
      </Container>
    </div>
  )
}
