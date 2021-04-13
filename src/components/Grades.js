import React, { useContext }  from 'react'
import { withRouter } from 'react-router'
import { AuthContext } from "./AuthProvider.js";

import { makeStyles } from "@material-ui/core/styles";
import { Container } from '@material-ui/core'

import queryString from 'query-string'

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

  const { currentUser } = useContext(AuthContext)
  
  const qs = queryString.parse(props.location.search)
  
  const classes = useStyles()

  // Only instructors can access this page.
  if (currentUser.data.type !== "instructor") {
    return (
      <h3 style={{color: "red"}}>ERROR 403: Forbidden</h3>
    )
  }

  // Require an assignment be specified (otherwise, what is there to look at?).
  if (!qs.assignment) {
    return (
      <h3 style={{color: "red"}}>ERROR 404: No assignment specified</h3>
    )
  }

  return (
    <div>
      <Container className={classes.container}>
          Test {qs.assignment}
      </Container>
    </div>
  )
}

export default withRouter(PickAssignmentForGrades)