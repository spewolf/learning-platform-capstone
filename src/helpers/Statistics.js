export function getTotalAssignmentPoints(assignment) {
    var total = 0

    assignment.questions.forEach((question) => {
        total += question.points
    })

    return total
}