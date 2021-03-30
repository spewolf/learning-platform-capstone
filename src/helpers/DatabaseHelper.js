// Needed for javadocs
// eslint-disable-next-line
import firebase from "firebase";

/**
 * Gets all of the assignments assigned to a given course.
 * @param {firebase.firestore.Firestore} db A reference to the Firestore database.
 * @param {string} userCourse The course to query for
 * @returns A promise to get the assignment data.
 */
export async function getAssignmentsForCourse(db, userCourse) {
    var assignmentData = []

    // Get assignments collection.
    const assignments = await db.collection("assignments").where('course', '==', userCourse).get()

    // Add each assignment to a list.
    assignments.forEach(doc => {
        const data = {...doc.data()}
        data.id = doc.id
        assignmentData.push(data)
    })

    // Return list of assignment objects.
    return assignmentData
}

/**
 * Get data from the database for a given assignment.
 * @param {firebase.firestore.Firestore} db A reference to the Firestore database.
 * @param {string} id The Assignment id to retrieve
 * @returns A promise to get the assignment data requested.
 */
export async function getAssignment(db, id) {
    const assignment = await db.collection("assignments").doc(id).get()
    var data = {...assignment.data()}
    data.id = assignment.id

    return data
}

/**
 * Checks whether a given student has taken a given assignment already.
 * @param {firebase.firestore.Firestore} db A reference to the Firestore database.
 * @param {string} studentUID The UID of the student to search for.
 * @param {string} assignmentUID The UID of the assignment to search for.
 * @returns As a promise, true if the student has taken the assignment, false otherwise.
 */
export async function hasStudentTakenAssignment(db, studentUID, assignmentUID) {
    const submissions = await db.collection("assignments").doc(assignmentUID).collection("submissions").where("studentID", "==", studentUID).get()
    return !submissions.empty
}

/**
 * Gets all of the submissions for a given assignment from the given database.
 * @param {firebase.firestore.Firestore} db A reference to the Firestore database.
 * @param {string} assignmentUID The UID of the assignment to get the submissions of.
 * @returns As a promise, info on all of the submissions for the given assignment.
 */
export async function getSubmissions(db, assignmentUID) {
    var data = []
    const submissions =  await db.collection("assignments").doc(assignmentUID).collection("submissions").get()

    submissions.forEach(doc => {
        data.push(doc.data())
    })

    return data
}