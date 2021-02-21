import {padBinaryWithZeros, decimalToBinary} from './binary.helpers'
import {getRandomBase10, getRandomBase2} from './Random'

export function generateBinToDecQuestion() {
    const num = getRandomBase2("00000000", "100000000");
    const type = "binaryToDecimal"
    const content = "What is the decimal form of " + padBinaryWithZeros(num, 8) + "(base2)?"
    const args = [num]

    const JSON = {
        "type": type,
        "content": content,
        "arguments": args
    }

    return JSON
}

export function generateDecToBinQuestion() {
    const num = getRandomBase10(0, 256);
    const type = "decimalToBinary"
    const content = "What is the binary form of " + num + "(base10)?"
    const args = [num]

    const JSON = {
        "type": type,
        "content": content,
        "arguments": args
    }

    return JSON
}

export function generateAdditionQuestion() {
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
        "arguments": args
    }

    return JSON
}

export function generateSubtractionQuestion() {
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
        "arguments": args
    }

    return JSON
}

/**
 * @param questionGenerators An array of pointers to functions that generate desired questions.
 * @param numberOfQuestions The number of questions in the assignment.
 * @param type The type of assignment ("graded" or "ungraded")
 * @param course The course ID of the course which created this assignment.
 * @param title The title of the assignment.
 * 
 * @returns An assignment JSON with randomly generated questions.
 */
export function generateAssignment(questionGenerators, numberOfQuestions, type, course, title) {
    // Set up JSON
    var JSON = {
        "type": type,
        "course": course,
        "title": title,
        "questions": []
    }

    // Fill with questions based on questionTypes parameter.
    if (questionGenerators.length > 0) {
        for (var i = 0; i < numberOfQuestions; i++) {
            const questionType = getRandomBase10(0, questionGenerators.length)

            JSON.questions.push(questionGenerators[questionType]())
        }
    }

    return JSON
}