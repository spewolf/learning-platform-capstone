import React, { useContext, useEffect }  from 'react'
import { withRouter } from 'react-router'
import { AuthContext } from "./AuthProvider.js";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Paper, Table, TableCell, TableRow } from '@material-ui/core'

import firebase from "firebase";
import queryString from 'query-string'

import {
  getTotalAssignmentPoints
} from '../helpers/StatisticsHelper'
import {
  getAssignment, getSubmissions,
} from '../helpers/DatabaseHelper'

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
  }
}))

const PickAssignmentForGrades = (props) => {
  props.setLocation("Grades")

  const app = firebase.apps[0]
  const db = firebase.firestore(app)
  const qs = queryString.parse(props.location.search)
  const { currentUser } = useContext(AuthContext)
  
  const [assignment, setAssignment] = React.useState({ })
  const [submissions, setSubmissions] = React.useState({ })
  const [totalPoints, setTotalPoints] = React.useState(0)
  
  const classes = useStyles()

  useEffect(() => {
    // Get assignment
    const assignmentPromise = getAssignment(db, qs.assignment)
    assignmentPromise.then((data) => { setAssignment(data) })
    assignmentPromise.then((data) => setAssignmentStats(data))

    // Get submissions
    const submissionsPromise = getSubmissions(db, qs.assignment)
    submissionsPromise.then((data) => { setSubmissions(data) })
  }, [db, setAssignment, setSubmissions, qs.assignment])

  const setAssignmentStats = (assignmentData) => {
    if (!assignmentData || !assignmentData.questions) return

    setTotalPoints(getTotalAssignmentPoints(assignmentData))
  }

  // Require an assignment be specified (otherwise, what is there to look at?).
  if (!qs.assignment) {
    return (
      <h3 style={{color: "red"}}>ERROR 404: No assignment specified</h3>
    )
  }

  // Only instructors can access this page.
  if (currentUser.data.type !== "instructor") {
    return (
      <h3 style={{color: "red"}}>ERROR 403: Forbidden</h3>
    )
  }

  return (
    <div>
      <Container className={classes.container}>
        <div style={!assignment.course || currentUser.data.course === assignment.course ? {display: "none"} : {}}>
            <h3 style={{color: "red"}}>ERROR 403: Forbidden</h3>
        </div>
        <div style={currentUser.data.course === assignment.course ? {} : {display: "none"}}>
          <h3 style={{paddingLeft: ".9em"}}>{assignment.title} ({submissions.length} submissions)</h3>
            {submissions.map ? submissions.map((submission) => {
              return (
                <Paper elevation="3" className={classes.paper} style={{marginBottom: "1em"}}>
                  <Grid container spacing="3">
                    <Grid item xs={4}>
                      <p><strong>Name: {submission.studentName}</strong></p>
                      <p>BGSU ID: {submission.studentBGID}</p>
                      <p>Grade: {submission.score.toFixed(1)} / {totalPoints.toFixed(1)} <strong>({submission.score / totalPoints * 100}%)</strong></p>
                    </Grid>
                    <Grid item xs={8}>
                      <Table style={{marginTop: "1em"}} align="center">
                        <TableRow>
                          <TableCell align="right"><strong>Question #</strong></TableCell>
                          {submission.questions.map((question, index) => {
                            const correctColor = "#33BB33"
                            const incorrectColor = "#FF6666"
                            if (question.result) {
                              return ( <TableCell align="center" style={{backgroundColor: correctColor}}><strong>{index+1}</strong></TableCell> )
                            } else {
                              return ( <TableCell align="center" style={{backgroundColor: incorrectColor}}><strong>{index+1}</strong></TableCell> )
                            }
                          })}
                        </TableRow>
                        <TableRow>
                          <TableCell align="right"><strong>Points</strong></TableCell>
                          {submission.questions.map((question, index) => {
                            const correctColor = "#33BB33"
                            const incorrectColor = "#FF6666"
                            if (question.result) {
                              return ( <TableCell align="center" style={{backgroundColor: correctColor}}><strong>{question.result ? question.points : 0}</strong></TableCell> )
                            } else {
                              return ( <TableCell align="center" style={{backgroundColor: incorrectColor}}><strong>{question.result ? question.points : 0}</strong></TableCell> )
                            }
                          })}
                        </TableRow>
                      </Table>
                    </Grid>
                  </Grid>
                </Paper>
              )
            }) : <div/>}
        </div>
      </Container>
    </div>
  )
}

export default withRouter(PickAssignmentForGrades)