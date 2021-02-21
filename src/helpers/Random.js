import { decimalToBinary, binaryToDecimal } from "./binary.helpers"

// Get a random base-10 number in the range [min, max).  Inputs are base-10.
export function getRandomBase10(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

// Get a random base-2 number in the range [min, max).  Inputs are base-2.
export function getRandomBase2(min, max) {
    const minBase10 = parseInt(binaryToDecimal(min))
    const maxBase10 = parseInt(binaryToDecimal(max))

    const answerBase10 = getRandomBase10(minBase10, maxBase10)
    const answerBase2  = decimalToBinary(answerBase10)
    return answerBase2
}