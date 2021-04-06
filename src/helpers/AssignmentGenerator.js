import {padBinaryWithZeros, decimalToBinary} from './binary.helpers'
import {getRandomBase10, getRandomBase2} from './Random'

export function generateBinToDecQuestion(points) {
    const num = getRandomBase2("00000000", "100000000");
    const type = "binaryToDecimal"
    const content = "What is the decimal form of " + padBinaryWithZeros(num, 8) + "(base2)?"
    const args = [num]

    const JSON = {
        "type": type,
        "content": content,
        "arguments": args,
        "points": points
    }

    return JSON
}

export function generateDecToBinQuestion(points) {
    const num = getRandomBase10(0, 256);
    const type = "decimalToBinary"
    const content = "What is the binary form of " + num + "(base10)?"
    const args = [num]

    const JSON = {
        "type": type,
        "content": content,
        "arguments": args,
        "points": points
    }

    return JSON
}

export function generateAdditionQuestion(points) {
    const num1 = getRandomBase10(0, 256);
    const num2 = getRandomBase10(0, 256-num1); // Lower upper bound to avoid overflow in solution.
    const num1Bin = decimalToBinary(num1)
    const num2Bin = decimalToBinary(num2)
    const type = "binaryAddition"
    const content = "What is " + padBinaryWithZeros(num1Bin, 8) + "(base2) + "
        + padBinaryWithZeros(num2Bin, 8) + "(base2)?"
    const args = [num1Bin, num2Bin]

    const JSON = {
        "type": type,
        "content": content,
        "arguments": args,
        "points": points
    }

    return JSON
}

export function generateSubtractionQuestion(points) {
    const num1 = getRandomBase10(0, 256);
    const num2 = getRandomBase10(0, num1); // Lower upper bound to avoid underflow in solution.
    const num1Bin = decimalToBinary(num1)
    const num2Bin = decimalToBinary(num2)
    const type = "binarySubtraction"
    const content = "What is " + padBinaryWithZeros(num1Bin, 8) + "(base2) - "
        + padBinaryWithZeros(num2Bin, 8) + "(base2)?"
    const args = [num1Bin, num2Bin]

    const JSON = {
        "type": type,
        "content": content,
        "arguments": args,
        "points": points
    }

    return JSON
}

/**
 * @param questionGenerators An array of pointers to functions that generate desired questions.
 * @param numberOfQuestions The number of questions in the assignment.
 * 
 * @returns An assignment JSON with randomly generated questions.
 */
export function generatePracticeAssignment(questionGenerators, numberOfQuestions) {
    // Set up JSON
    var JSON = {
        "type": "ungraded",
        "course": "N/A",
        "title": "Practice",
        "questions": []
    }

    // Fill with questions based on given questionGenerators.
    if (questionGenerators.length > 0) {
        for (var i = 0; i < numberOfQuestions; i++) {
            const questionType = getRandomBase10(0, questionGenerators.length)

            JSON.questions.push(questionGenerators[questionType](0))
        }
    }

    return JSON
}

/**
 * Generates a graded assignment with the given question information, course name, and title.
 * @param {Map<Function, Object} questionGeneratorMap A map from a question generator function to an object containing "quantity" and "points" elements.
 * @param {String} course The course ID of the course which created this assignment.
 * @param {String} title The title of this assignment.
 * @param {Date} date The due date for the assignment.
 * @return {JSON} The newly-created assignment JSON object.
 */
export function generateGradedAssignment(questionGeneratorMap, course, title, date=undefined) {
    // Set up JSON
    var JSON = {
        "type": "graded",
        "course": course,
        "title": title,
        "questions": []
    }

    if (date) {
        JSON.due = date
    }

    // Fill questions based on given question information.
    questionGeneratorMap.forEach((info, generator) => {
        for (var i = 0; i < info.quantity; i++) {
            JSON.questions.push(generator(info.points))
        }
    })

    return JSON
}