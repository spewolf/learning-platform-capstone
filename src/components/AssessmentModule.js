import React from 'react'

import { Button, Container, Paper } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

import {
  generateAssignment
} from '../helpers/AssignmentGenerator'
import Quiz from './Quiz'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
}))

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

  const [numberOfQuestions, setNumberOfQuestions] = React.useState("")
  const [assignment, setAssignment] = React.useState(emptyAssignment)
  const [showAssignment, setShowAssignment] = React.useState(false)

  const classes = useStyles()

  // Called when the user clicks the "begin" button.
  const begin = (event) => {
    event.preventDefault()

    // TODO: Decide which question functions to use.
    const functions = []
    setNumberOfQuestions("5")

    setAssignment(generateAssignment(functions, parseInt(numberOfQuestions), "graded", "dummyCourse", "dummyTitle"));
    setShowAssignment(true);
  };

  const handleSubmission = (submission) => {
    // TODO: Send submission to db.
  }

  return (
    <div>
      <div style={showAssignment ? {display: "none"} : {}}>
        <Container className={classes.container}>
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
      <Container className={classes.container} style={showAssignment ? {} : {display: "none"}}>
        <Quiz assignment={assignment} handleSubmission={handleSubmission}/>
      </Container>
    </div>
  )
}
