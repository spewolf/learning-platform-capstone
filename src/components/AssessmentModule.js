import React from 'react'

import { Button, Container, Paper } from '@material-ui/core';

import {
  generateBinToDecQuestion,
  generateDecToBinQuestion,
  generateAdditionQuestion,
  generateSubtractionQuestion,
  generateAssignment
} from '../helpers/AssignmentGenerator'
import Quiz from './Quiz'

export default function AssessmentModule(props) {
  props.setLocation("Assessments")
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

  const [numberOfQuestions, setNumberOfQuestions] = React.useState("5")
  const [assignment, setAssignment] = React.useState(emptyAssignment)
  const [showAssignment, setShowAssignment] = React.useState(false)

  // Called when the user clicks the "begin" button.
  const begin = (event) => {
    event.preventDefault()

    // TODO: Decide which question functions to use.
    const functions = []

    setAssignment(generateAssignment(functions, parseInt(numberOfQuestions), "graded", "dummyCourse", "dummyTitle"));
    setShowAssignment(true);
  };

  const handleSubmission = (submission) => {
    // TODO: Send submission to db.
  }

  return (
    <div>
      <div style={showAssignment ? {display: "none"} : {}}>
        <Container>
          <form>
              <h4>Choose an assessment to start</h4>
              <Paper elevation={3} style={{paddingLeft: ".3em", margin: "1em"}}>
                <p>Assessments will show up here.</p>
              </Paper>
            <Button
              disabled={
                // TODO: Disable the button if none of the Assessments are selected.
                false
              }
              onClick={begin}
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
        <Quiz assignment={assignment} handleSubmission={handleSubmission}/>
      </Container>
    </div>
  )
}
