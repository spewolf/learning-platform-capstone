import React, { useContext, useEffect }  from 'react'
import { withRouter } from 'react-router'
import { AuthContext } from "./AuthProvider.js";

import firebase from "firebase";
import queryString from 'query-string'

import {
    getAverageScore,
    getTotalAssignmentPoints,
    getHighestScore,
    getLowestScore
 } from '../helpers/StatisticsHelper'

import {
    getAssignment, getSubmissions,
  } from '../helpers/DatabaseHelper'

const Statistics = (props) => {
    props.setLocation("Statistics")
    
    const app = firebase.apps[0];
    const db = firebase.firestore(app);
    const qs = queryString.parse(props.location.search)
    const { currentUser } = useContext(AuthContext)

    const [assignment, setAssignment] = React.useState({ })
    const [submissions, setSubmissions] = React.useState({ })

    useEffect(() => {
        // Get assignment
        const assignmentPromise = getAssignment(db, qs.assignment)
        assignmentPromise.then((data) =>{ setAssignment(data) })

        // Get submissions
        const submissionsPromise = getSubmissions(db, qs.assignment)
        submissionsPromise.then((data) => { setSubmissions(data) })

    }, [db, setAssignment, setSubmissions, qs.assignment])

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
            <div style={!assignment.course || currentUser.data.course === assignment.course ? {display: "none"} : {}}>
                <h3 style={{color: "red"}}>ERROR 403: Forbidden</h3>
            </div>
            <div style={currentUser.data.course === assignment.course ? {} : {display: "none"}}>
                <h3>{assignment.title} Statistics</h3>
                <p>Number of submissions: {submissions.length}</p>
                <p>Average: {getAverageScore(submissions).toFixed(1) + " / " + getTotalAssignmentPoints(assignment).toFixed(1)}</p>
                <p>Highest: {getHighestScore(submissions).toFixed(1) + " / " + getTotalAssignmentPoints(assignment).toFixed(1)}</p>
                <p>Lowest: {getLowestScore(submissions).toFixed(1) + " / " + getTotalAssignmentPoints(assignment).toFixed(1)}</p>
            </div>
        </div>
    )
}

export default withRouter(Statistics)