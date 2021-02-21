import { decimalToBinary, binaryToDecimal } from "./binary.helpers"

export function getRandomBase10(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

export function getRandomBase2(min, max) {
    const minBase10 = parseInt(binaryToDecimal(min))
    const maxBase10 = parseInt(binaryToDecimal(max))

    const answerBase10 = getRandomBase10(minBase10, maxBase10)
    const answerBase2  = decimalToBinary(answerBase10)
    return answerBase2
}