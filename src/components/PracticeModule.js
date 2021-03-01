import React from 'react'

import { Button, Container, Input, Paper } from '@material-ui/core';
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
  const emptyAssignment = {
    "uid": "",
    "type": "",
    "due": "",
    "course": "",
    "title": "",
    "questions": [
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
            <h1>Practice</h1>
            <div style={{display: "flex"}}>
              <div style={{width: "50%", margin: ".3em"}}>
                <h4>From Assignments</h4>
                <Paper elevation={3}>
                  {/* TODO: This should pull from the db to see whether or not the user has any assignments. */}
                  <p>You have no practice assignments.</p>
                </Paper>
              </div>
              <div style={{width: "50%", margin: ".3em"}}>
                <h4>Custom</h4>
                <Paper elevation={3}>
                  <div style={{display: "flex"}}>
                    <Checkbox name="BinToDec" onChange={onBinToDecChanged}/>
                    <p>Binary to Decimal Conversion</p>
                  </div>
                  <div style={{display: "flex"}}>
                    <Checkbox name="DecToBin" onChange={onDecToBinChanged}/>
                    <p>Decimal to Binary Conversion</p>
                  </div>
                  <div style={{display: "flex"}}>
                    <Checkbox name="Add" onChange={onAddChanged}/>
                    <p>Binary Addition</p>
                  </div>
                  <div style={{display: "flex"}}>
                    <Checkbox name="Sub" onChange={onSubChanged}/>
                    <p>Binary Subtraction</p>
                  </div>
                  <div style={{display: "flex"}}>
                    <p>How many problems?</p>
                    <Input style={{margin: "1em"}} onChange={onInputChanged}/>
                  </div>
                </Paper>
              </div>
            </div>
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
