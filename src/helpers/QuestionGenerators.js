import {padBinaryWithZeros, decimalToBinary} from './binary.helpers'
import {getRandomBase10, getRandomBase2} from './Random'

export function generateBinToDecQuestion() {
    const num = getRandomBase2("00000000", "11111111");
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
    const num = getRandomBase10(0, 255);
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
    const num1 = getRandomBase10(0, 255);
    const num2 = getRandomBase10(0, 255-num1); // Lower upper bound to avoid overflow in solution.
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
    const num1 = getRandomBase10(0, 255);
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