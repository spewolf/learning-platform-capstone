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
 * @param {array} submissions List of submissions for an assignment.  All submissions should have the
 *                            same number of questions in the same order.
 * @return {number} The index of the question that was most missed.
 */
export function getMostMissedQuestion(submissions) {
  if (!submissions.forEach || submissions.length < 1 || !submissions[0].questions || submissions[0].questions.length < 1) return -1

  // Make a list of how many people got each question right.
  var questionCorrect = []
  for (let i = 0; i < submissions[0].questions.length; i++) {
    questionCorrect[i] = 0
  }
  for (let i = 0; i < submissions.length; i++) {
    const submission = submissions[i]
    for (let j = 0; j < submission.questions.length; j++) {
      const question = submission.questions[j]
      if (question.result) {
        questionCorrect[j]++
      }
    }
  }

  // Figure out which question has the lowest number of correct responses.
  var lowestIndex = 0
  var lowestValue = questionCorrect[0]
  for (let i = 1; i < questionCorrect.length; i++) {
    const value = questionCorrect[i]
    if (value < lowestValue) {
      lowestIndex = i
      lowestValue = value
    }
  }

  return lowestIndex
}

/**
 * Returns the average score in a given list of submissions.
 * @param {array} submissions List of submissions for an assignment.
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
 * @param {array} submissions List of submissions for an assignment.
 * @return {number} The median score.
 */
export function getMedianScore(submissions) {
  if (!submissions.forEach || submissions.length < 1) return 0

  // Fill array with score values
  var scores = []
  submissions.forEach(submission => {
    scores.push(submission.score)
  })

  // Sort score values
  scores.sort((num1, num2) => {
    return num1 - num2
  })

  // Calculate median
  var median = 0
  if (scores.length % 2 === 0) { // Even length
    const i1 = scores.length / 2 - 1
    const i2 = scores.length / 2

    median = (scores[i1] + scores[i2]) / 2
  } else { // Odd length
    const i = Math.floor(scores.length / 2)

    median = scores[i]
  }

  return median
}

/**
 * Returns the highest score in a given list of submissions.
 * @param {array} submissions List of submissions for an assignment.
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
 * @param {array} submissions List of submissions for an assignment.
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

/**
 * Looks through all of the submissions and sees how many got each question correct and returns the results in an array.
 * @param {array} submissions List of submissions for an assignment.
 * @returns {array} A list containing how many submissions got each question correct.
 */
export function getNumberCorrect(submissions) {
  if (!submissions.forEach || submissions.length < 1 || !submissions[0].questions || submissions[0].questions.length < 1) return []

  var counts = []
  for (let i = 0; i < submissions[0].questions.length; i++) {
    var count = 0

    submissions.forEach(submission => {
      if (submission.questions[i].result) {
        count++
      }
    })

    counts[i] = count
  }

  return counts
}