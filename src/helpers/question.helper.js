import { binaryToDecimal, cleanBinaryStr, decimalToBinary } from "./binary.helpers";

export default function checkAnswer(q, a) {
  switch (q.type) {
    case "decimalToBinary":
      return checkDecimalToBinary(q, a);
    case "binaryToDecimal":
      return checkBinaryToDecimal(q, a);
    case "binaryAddition":
      return checkBinaryAddition(q, a);
    case "binarySubtraction":
      return checkBinarySubtraction(q, a);
  }
}

function checkDecimalToBinary(q, answer) {
  const correct = decimalToBinary(q.arguments[0]);
  const answer_base2 = cleanBinaryStr(answer);
  return correct == answer_base2;
}

function checkBinaryToDecimal(q, answer) {
  return true;
}

function checkBinaryAddition(q, answer) {
  return false;
}

function checkBinarySubtraction(q, answer) {
  return false;
}
