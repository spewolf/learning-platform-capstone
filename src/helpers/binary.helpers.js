import { Convert } from 'any-to-any';

// Converts the given number from one base to another, specified as parameters.
function ConvertWithZero(num, leftBase, rightBase) {
    const result = Convert(num, leftBase, rightBase);
    return result != "" ? result : "0";
}

// Returns the base-10 equivalent of the given base-2 parameter.
export function binaryToDecimal(binNum) {
    return ConvertWithZero(binNum, 2, 10);
}

// Returns the base-2 equivalent of the given base-10 parameter.
export function decimalToBinary(decNum) {
    return ConvertWithZero(decNum, 10, 2);
}

// Adds two base-2 numbers and returns the result in base-2.
export function binaryAdd(left, right) {
    left = parseInt(ConvertWithZero(left, 2, 10))
    right = parseInt(ConvertWithZero(right, 2, 10))
    return ConvertWithZero(left + right, 10, 2);
}

// Subtracts two base-2 numbers and returns the result in base-2.
export function binarySubtract(left, right) {
    left = parseInt(ConvertWithZero(left, 2, 10))
    right = parseInt(ConvertWithZero(right, 2, 10))
    return ConvertWithZero(left - right, 10, 2);
}

// Returns true if the given base-2 numbers are equal, ignoring leading 0s.
export function binaryStrEquality(left, right) {
    left = cleanBinaryStr(left);
    right = cleanBinaryStr(right);
    return ConvertWithZero(left == right);
}

// Returns a base-2 number equivalent to the given base-2 parameter without any leading 0s.
export function cleanBinaryStr(str) {
    const regex = /1[10]+/;
    const match = str.match(regex);
    return match ? match[0] : '0';
}

// Returns a base-2 number equivalent to the given base-2 parameter with the desired length
// by padding the number with leading zeros.
export function padBinaryWithZeros(str, len) {
    if (str.length >= len) return str

    while (str.length < len) {
        str = "0" + str
    }
    return str
}