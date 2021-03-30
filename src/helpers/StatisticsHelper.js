/**
 * Calculates and returns the total number of points in an assignment.
 * @param {Object} assignment An object containing a list of questions that each have a point value associated with them.
 * @returns {number} The total number points in the assignment.
 */
export function getTotalAssignmentPoints(assignment) {
    if (!assignment.questions) return 0

    var total = 0

    assignment.questions.forEach((question) => {
        total += question.points
    })

    return total
}

/**
 * Returns the index of the question that was most missed in a given list of submissions.
 * @param {Object} submissions List of submissions for an assignment.  All submissions should have the
 *                             same number of questions in the same order.
 * @return {number} The index of the question that was most missed.
 */
export function getMostMissedQuestion(submissions) {

}

/**
 * Returns the average score in a given list of submissions.
 * @param {Object} submissions List of submissions for an assignment.
 * @return {number} The average score.
 */
export function getAverageScore(submissions) {
    if (!submissions.forEach || submissions.length < 1) return 0

    var total = 0
    var count = 0

    submissions.forEach(submission => {
        count++
        total += submission.score
    })

    return total / count
}

/**
 * Returns the median score in a given list of submissions.
 * @param {Object} submissions List of submissions for an assignment.
 * @return {number} The median score.
 */
export function getMedianScore(submissions) {

}

/**
 * Returns the highest score in a given list of submissions.
 * @param {Object} submissions List of submissions for an assignment.
 * @return {number} The highest score.
 */
export function getHighestScore(submissions) {
    if (!submissions.forEach || submissions.length < 1) return 0

    var highest = Number.MIN_VALUE

    submissions.forEach(submission => {
        if (submission.score > highest) {
            highest = submission.score
        }
    })

    return highest
}

/**
 * Returns the lowest score in a given list of submissions.
 * @param {Object} submissions List of submissions for an assignment.
 * @return {number} The lowest score.
 */
export function getLowestScore(submissions) {
    if (!submissions.forEach || submissions.length < 1) return 0

    var lowest = Number.MAX_VALUE

    submissions.forEach(submission => {
        if (submission.score < lowest) {
            lowest = submission.score
        }
    })

    return lowest
}