import React from 'react'

import { Button, Container, FormControlLabel, Input, Paper } from '@material-ui/core';
import Checkbox from './Checkbox.js'

import {
  generateBinToDecQuestion,
  generateDecToBinQuestion,
  generateAdditionQuestion,
  generateSubtractionQuestion,
  generateAssignment
} from '../helpers/AssignmentGenerator'
import Quiz from './Quiz'

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

    setAssignment(generateAssignment(functions, parseInt(numberOfQuestions), "ungraded", "dummyCourse", "dummyTitle"));
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
        <Container>
          <form onSubmit={begin}>
              <Paper elevation={3} style={{paddingLeft: ".3em", margin: "1em"}}>
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
      <Container style={showAssignment ? {} : {display: "none"}}>
        <Quiz assignment={assignment}/>
      </Container>
    </div>
  )
}
