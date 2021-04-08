import React, { useContext, useEffect }  from 'react'
import { withRouter } from 'react-router'
import { AuthContext } from "./AuthProvider.js";

import firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Paper } from '@material-ui/core'

import { getAssignmentsForCourse } from '../helpers/DatabaseHelper'
import { getTotalAssignmentPoints } from '../helpers/StatisticsHelper'
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
  }
}))

const PickAssignmentForGrades = (props) => {
  props.setLocation("Grades")

  const app = firebase.apps[0];
  const db = firebase.firestore(app);
  const { currentUser } = useContext(AuthContext)
  const userCourse = currentUser.data.course
  
  const classes = useStyles()
  
  const [assignmentObjects, setAssignmentObjects] = React.useState([])

  // Get this course's assignments
  useEffect(() => {
    const assignmentsPromise = getAssignmentsForCourse(db, userCourse)
    assignmentsPromise.then((assignments) => {
      setAssignmentObjects(assignments)
    })
  }, [setAssignmentObjects, db, userCourse])

  // Only instructors can access this page.
  if (currentUser.data.type !== "instructor") {
    return (
      <h3 style={{color: "red"}}>ERROR 403: Forbidden</h3>
    )
  }

  return (
    <div>
      <Container className={classes.container}>
          <form>
              <h3 style={{paddingLeft: ".9em"}}>Choose an assignment to view grades</h3>
              <Paper elevation={3} className={classes.paper}>
                <p style={assignmentObjects.length>0 ? {display: "none"} : {}}>There are no assignments.</p>
                <div style={assignmentObjects.length>0 ? {} : {display: "none"}}>
                  {assignmentObjects.map((data, index) => (
                    <div style={{padding: ".3em"}} key={index}>
                      <a style={{textDecoration: "none"}} href={"/grades?assignment=" + assignmentObjects[index].id}>
                        <Button
                          disabled={data.hasTaken}
                          color="primary"
                          style={{padding: "0em"}}>
                            <strong>{data.title}</strong>
                        </Button>
                      </a>
                      <p style={{margin: "0em"}}>{getTotalAssignmentPoints(data)} {getTotalAssignmentPoints(data) === 1 ? "Point" : "Points"} | {data.questions.length} {data.questions.length === 1 ? "Question" : "Questions"}</p>
                      <p style={{margin: "0em"}}>Due {cleanDate(new Date(data.due.seconds*1000))}</p>
                      <hr/>
                    </div>
                  ))}
                </div>
              </Paper>
          </form>
        </Container>
    </div>
  )
}

export default withRouter(PickAssignmentForGrades)