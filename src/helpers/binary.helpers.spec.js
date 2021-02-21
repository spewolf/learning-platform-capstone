import {
  binaryToDecimal,
  decimalToBinary,
  binaryAdd,
  binarySubtract,
  cleanBinaryStr,
  binaryStrEquality,
  padBinaryWithZeros
} from "./binary.helpers";

describe("binaryToDecimal", () => {
  test("Converts binary to decimal", () => {
    const num = binaryToDecimal("0110");
    expect(num).toBe("6");
  });
});

describe("decimalToBinary", () => {
  test("Converts decimal to binary", () => {
    const num = decimalToBinary("10");
    expect(num).toBe("1010");
  });
});

describe("binaryAdd", () => {
  test("Adds binary", () => {
    const num = binaryAdd("0110", "1001");
    expect(num).toBe("1111");
  });

  test("Adds zero to zero", () => {
    const num = binaryAdd("0", "0");
    expect(num).toBe("0");
  });
});

describe("binarySubtract", () => {
  test("Subtracts binary: 6 - 1 = 5", () => {
    const num = binarySubtract("0110", "0001");
    expect(num).toBe("101");
  });
});

describe("cleanBinaryStr", () => {
  test("Cleans normal binary number", () => {
    const num = cleanBinaryStr("0x00101");
    expect(num).toBe("101");
  });

  test("Cleans zero binary number", () => {
    const num = cleanBinaryStr("0x00000");
    expect(num).toBe("0");
  });

  test("Undoes padding by padBinaryWithZeros", () => {
    const num = "10001"
    const numWithPadding = padBinaryWithZeros(num, 8)
    const numWithouPadding = cleanBinaryStr(numWithPadding);
    expect(numWithouPadding).toBe(num);
  });
});

describe("padBinaryWithZeros", () => {
  test("Pads normal binary number", () => {
    const num = padBinaryWithZeros("101", 8)
    expect(num).toBe("00000101")
  });

  test("Pads zero binary number", () => {
    const num = padBinaryWithZeros("0", 8)
    expect(num).toBe("00000000")
  });

  test("Pads binary number that starts with proper length", () => {
    const num = padBinaryWithZeros("10000001", 8)
    expect(num).toBe("10000001")
  });

  test("Pads binary number that starts with length larger than requested", () => {
    const num = padBinaryWithZeros("10000001", 4)
    expect(num).toBe("10000001")
  });
});

describe("binaryStrEquality", () => {
    test('two binary strings are equal', () => {
        const l = "0x1011"
        const r = "1011"
        binaryStrEquality(l, r);
    })
})