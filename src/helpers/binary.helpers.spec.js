import {
  binaryToDecimal,
  decimalToBinary,
  binaryAdd,
  binarySubtract,
  cleanBinaryStr,
  binaryStrEquality,
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
});

describe("binaryStrEquality", () => {
    test('two binary strings are equal', () => {
        const l = "0x1011"
        const r = "1011"
        binaryStrEquality(l, r);
    })
})