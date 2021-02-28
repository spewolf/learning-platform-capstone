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
  return true;
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
