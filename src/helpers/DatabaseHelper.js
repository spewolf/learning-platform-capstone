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