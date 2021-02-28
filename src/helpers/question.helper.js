import {
  binaryAdd,
  binarySubtract,
  binaryToDecimal,
  cleanBinaryStr,
  decimalToBinary,
} from "./binary.helpers";

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
    default:
      console.log("Question type non-existent");
      break;
  }
}

function checkDecimalToBinary(q, answer) {
  const correct = decimalToBinary(q.arguments[0]);
  const answer_base2 = cleanBinaryStr(answer);
  return correct === answer_base2;
}

function checkBinaryToDecimal(q, answer) {
  const correct = binaryToDecimal(q.arguments[0]);
  return correct === answer;
}

function checkBinaryAddition(q, answer) {
  const correct = binaryAdd(q.arguments[0], q.arguments[1]);
  const answer_base2 = cleanBinaryStr(answer);
  return correct === answer_base2;
}

function checkBinarySubtraction(q, answer) {
  const correct = binarySubtract(q.arguments[0], q.arguments[1]);
  const answer_base2 = cleanBinaryStr(answer);
  return correct === answer_base2;
}
