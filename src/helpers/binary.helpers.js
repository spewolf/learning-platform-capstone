import { Convert } from 'any-to-any';

function ConvertWithZero(num, leftBase, rightBase) {
    const result = Convert(num, leftBase, rightBase);
    return result != "" ? result : "0";
}

export function binaryToDecimal(binNum) {
    return ConvertWithZero(binNum, 2, 10);
}

export function decimalToBinary(decNum) {
    return ConvertWithZero(decNum, 10, 2);
}

export function binaryAdd(left, right) {
    left = parseInt(ConvertWithZero(left, 2, 10))
    right = parseInt(ConvertWithZero(right, 2, 10))
    return ConvertWithZero(left + right, 10, 2);
}

export function binarySubtract(left, right) {
    left = parseInt(ConvertWithZero(left, 2, 10))
    right = parseInt(ConvertWithZero(right, 2, 10))
    return ConvertWithZero(left - right, 10, 2);
}

export function binaryStrEquality(left, right) {
    left = cleanBinaryStr(left);
    right = cleanBinaryStr(right);
    return ConvertWithZero(left == right);
}

export function cleanBinaryStr(str) {
    const regex = /1[10]+/;
    const match = str.match(regex);
    return match ? match[0] : '0';
}