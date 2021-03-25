/**
 * Gets all of the assignments assigned to a given course.
 * @param {firebase.firestore.Firestore} db A reference to the Firestore database.
 * @param {string} userCourse The course to query for
 * @returns A promise to get the assignment data.
 */
export async function getAssignmentsForCourse(db, userCourse) {
    var assignmentData = [];

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