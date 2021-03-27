import {
  binaryAdd,
  binarySubtract,
  binaryToDecimal,
  cleanBinaryStr,
  decimalToBinary,
} from "./binary.helpers";

export function checkAnswer(q, a) {
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

export function getHelp(q) {
  switch (q.type) {
    case "decimalToBinary":
      return getDecimalToBinaryHelp(q);
    case "binaryToDecimal":
      return getBinaryToDecimalHelp(q);
    case "binaryAddition":
      return getBinaryAdditionHelp(q);
    case "binarySubtraction":
      return getBinarySubtractionHelp(q);
    default:
      console.log("Question type non-existent");
      break;
  }
}

function getDecimalToBinaryHelp(q) {
  return (
    <p style={{ color: "red" }}>
      Incorrect! If you need help, check out the{" "}
      <a href="/learning?module=DecToBin" target="_blank">Decimal to Binary module</a>!
    </p>
  );
}

function getBinaryToDecimalHelp(q) {
  return (
    <p style={{ color: "red" }}>
      Incorrect! If you need help, check out the{" "}
      <a href="/learning?module=BinToDec" target="_blank">Binary to Decimal module</a>!
    </p>
  );
}

function getBinaryAdditionHelp(q) {
  return (
    <p style={{ color: "red" }}>
      Incorrect! If you need help, check out the{" "}
      <a href="/learning?module=Add" target="_blank">Binary Addition module</a>!
    </p>
  );
}

function getBinarySubtractionHelp(q) {
  return (
    <p style={{ color: "red" }}>
      Incorrect! If you need help, check out the{" "}
      <a href="/learning?module=Sub" target="_blank">Binary Subtraction module</a>!
    </p>
  );
}

export function getAnswer(q) {
  switch (q.type) {
    case "decimalToBinary":
      return getDecimalToBinary(q);
    case "binaryToDecimal":
      return getBinaryToDecimal(q);
    case "binaryAddition":
      return getBinaryAddition(q);
    case "binarySubtraction":
      return getBinarySubtraction(q);
    default:
      console.log("Question type non-existent");
      break;
  }
}

function getDecimalToBinary(q) {
  const correct = decimalToBinary(q.arguments[0]);
  return correct;
}

function getBinaryToDecimal(q) {
  const correct = binaryToDecimal(q.arguments[0]);
  return correct;
}

function getBinaryAddition(q) {
  const correct = binaryAdd(q.arguments[0], q.arguments[1]);
  return correct;
}

function getBinarySubtraction(q) {
  const correct = binarySubtract(q.arguments[0], q.arguments[1]);
  return correct;
}
