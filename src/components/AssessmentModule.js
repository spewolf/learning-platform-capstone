import React, { useContext, useEffect } from 'react'
import { AuthContext } from "./AuthProvider.js";
import firebase from "firebase";

import { Button, Container, Paper } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

import Quiz from './Quiz'
import { cleanDate } from '../helpers/Formatting'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
      paddingLeft: "1em",
      paddingTop: ".6em",
      paddingBottom: ".6em",
      paddingRight: "1em"
  },
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

  const [assignment, setAssignment] = React.useState(emptyAssignment)
  const [showAssignment, setShowAssignment] = React.useState(false)
  const [assignmentObjects, setAssignmentObjects] = React.useState([])

  // Figure out which course the user is in.
  const { currentUser } = useContext(AuthContext)
  const userCourse = currentUser.data.course
  
  const classes = useStyles()

  // Get handle on the database.
  const app = firebase.apps[0];
  const db = firebase.firestore(app);

  // Get all of the user's assignments from the database.
  useEffect(() => {
    async function setAssignments(db, setAssignmentObjects) {
      // Get assignments collection.
      const assignments = await db.collection("assignments").where('course', '==', userCourse).get()

      // Add each assignment to a list and update state.
      var assignmentData = [];
      assignments.forEach(doc => {
        assignmentData.push(doc.data())
      })
      setAssignmentObjects(assignmentData)
    }

    // Actually call the above async function.
    setAssignments(db, setAssignmentObjects)
  }, [db, setAssignmentObjects, userCourse])

  const handleSubmission = (submission) => {
    // TODO: Send submission to db.
  }

  // Called when the user clicks on one of the assignment buttons to begin the assignment.
  const startAssignment = (index) => {
    setAssignment(assignmentObjects[index])
    setShowAssignment(true)
  }

  return (
    <div>
      <div style={showAssignment ? {display: "none"} : {}}>
        <Container className={classes.container}>
          <form>
              <h3 style = {{paddingLeft: ".9em"}}>Choose an assignment to start</h3>
              <Paper elevation={3} className={classes.paper}>
                <p style={assignmentObjects.length>0 ? {display: "none"} : {}}>You have no assignments.</p>
                <div style={assignmentObjects.length>0 ? {} : {display: "none"}}>
                  {assignmentObjects.map((data, index) => (
                    <div style={{padding: ".3em"}}>
                      <Button color="primary" onClick={() => startAssignment(index)} style={{padding: "0em"}}><strong>{data.title}</strong></Button>
                      <p style={{margin: "0em"}}>{data.questions.length} {data.questions.length === 1 ? "Question" : "Questions"}</p>
                      <p style={{margin: "0em"}}>Due {cleanDate(new Date(data.due.seconds*1000))}</p>
                      <hr/>
                    </div>
                  ))}
                </div>
              </Paper>
          </form>
        </Container>
      </div>
      <Container className={classes.container} style={showAssignment ? {} : {display: "none"}}>
        <Quiz assignment={assignment} handleSubmission={handleSubmission}/>
      </Container>
    </div>
  )
}
