import React, { useContext, useEffect }  from 'react'
import { withRouter } from 'react-router'
import { AuthContext } from "./AuthProvider.js";

import { Accordion, AccordionDetails, AccordionSummary, Container, Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import firebase from "firebase";
import queryString from 'query-string'
import { VerticalBarSeries, ChartLabel, XAxis, YAxis, XYPlot } from 'react-vis'

import {
  getTotalAssignmentPoints,
  getMostMissedQuestion,
  getAverageScore,
  getMedianScore,
  getHighestScore,
  getLowestScore,
  getNumberCorrect,
  getAnswerFrequencies
} from '../helpers/StatisticsHelper'
import {
  getAssignment, getSubmissions,
} from '../helpers/DatabaseHelper'
import QuestionOverview from './QuestionOverview'

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
  xyPlot: {
    marginTop: ".3em",
    marginLeft: ".3em",
    marginBottom: ".3em",
  }
}))

const Statistics = (props) => {
  props.setLocation("Statistics")
  
  const app = firebase.apps[0];
  const db = firebase.firestore(app);
  const qs = queryString.parse(props.location.search)
  const { currentUser } = useContext(AuthContext)

  const [assignment, setAssignment] = React.useState({ })
  const [submissions, setSubmissions] = React.useState({ })
  const [totalPoints, setTotalPoints] = React.useState(0)
  const [questionsCorrectData, setQuestionsCorrectData] = React.useState([])
  
  const classes = useStyles()

  useEffect(() => {
    // Get assignment
    const assignmentPromise = getAssignment(db, qs.assignment)
    assignmentPromise.then((data) => { setAssignment(data) })
    assignmentPromise.then((data) => setAssignmentStats(data))

    // Get submissions
    const submissionsPromise = getSubmissions(db, qs.assignment)
    submissionsPromise.then((data) => { setSubmissions(data) })
    submissionsPromise.then((data) => setSubmissionStats(data))
  }, [db, setAssignment, setSubmissions, qs.assignment])

  const setAssignmentStats = (assignmentData) => {
    setTotalPoints(getTotalAssignmentPoints(assignmentData))
  }

  const setSubmissionStats = (submissionsData) => {
    const numberCorrect = getNumberCorrect(submissionsData)
    var questionsCorrect = [ ]
    for (let i = 0; i < numberCorrect.length; i++) {
      questionsCorrect.push({x: i+"", y: numberCorrect[i]})
    }
    setQuestionsCorrectData(questionsCorrect)
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
          <h3 style={{paddingLeft: ".9em"}}>{assignment.title}</h3>
          <Paper elevation="3" className={classes.paper}>
            <Grid container spacing="3">
              <Grid item xs={4}>
                <XYPlot className={classes.xyPlot} height={300} width={300} xType="ordinal">
                  <XAxis top={254} />
                  <YAxis left={12} />
                  <ChartLabel style={{textAnchor: "middle"}} includeMargin={false} text="Question #" xPercent={0.5} yPercent={1.2} />
                  <ChartLabel style={{transform: "rotate(-90)", textAnchor: "middle"}} includeMargin={false} text="# of Correct Responses" xPercent={-0.08} yPercent={0.5} />
                  <VerticalBarSeries color="#FF7300" data={questionsCorrectData}/>
                </XYPlot>
              </Grid>
              <Grid item xs={4}>
                  <h2>Lowest Score: {getLowestScore(submissions).toFixed(1) + " / " + totalPoints.toFixed(1)}</h2>
                  <h2>Average Score: {getAverageScore(submissions).toFixed(1) + " / " + totalPoints.toFixed(1)}</h2>
              </Grid>
              <Grid item xs={4}>
                  <h2>Highest Score: {getHighestScore(submissions).toFixed(1) + " / " + totalPoints.toFixed(1)}</h2>
                  <h2>Median Score: {getMedianScore(submissions).toFixed(1) + " / " + totalPoints.toFixed(1)}</h2>
              </Grid>
            </Grid>

            <h2 style={{paddingTop: "1em"}}>Most missed question:</h2>
            <Paper elevation="3" className={classes.paper}>
              <QuestionOverview
                question={assignment.questions ? assignment.questions[getMostMissedQuestion(submissions)] : undefined}
                frequencies={assignment.questions ? getAnswerFrequencies(submissions, getMostMissedQuestion(submissions)) : undefined}
              />
            </Paper>

            <h2 style={{paddingTop: "1em"}}>Question breakdown:</h2>
            {assignment.questions ? assignment.questions.map((question, index) => {
              return (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography>{question.content}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <QuestionOverview
                      question={question}
                      frequencies={getAnswerFrequencies(submissions, index)}
                    />
                  </AccordionDetails>
                </Accordion>
              )
            }) : <div/>}
          </Paper>
        </div>
      </Container>
    </div>
  )
}

export default withRouter(Statistics)