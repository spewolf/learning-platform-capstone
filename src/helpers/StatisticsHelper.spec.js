import {
  getTotalAssignmentPoints,
  getMostMissedQuestion,
  getAverageScore,
  getMedianScore,
  getHighestScore,
  getLowestScore,
  getNumberCorrect,
  getAnswerFrequencies
} from './StatisticsHelper'

// Total Assignment Points
describe("getTotalAssignmentPoints", () => {
  test("Assignment with no questions", () => {
    const JSON = { }
    expect(getTotalAssignmentPoints(JSON)).toBe(0)
  })

  test("Assignment with an empty list of questions", () => {
    const JSON = {
      "questions": []
    }
    expect(getTotalAssignmentPoints(JSON)).toBe(0)
  })

  test("Assignment with at least one question", () => {
    const JSON = {
      "questions": [
        { "points": 3 },
        { "points": 2 }
      ]
    }
    expect(getTotalAssignmentPoints(JSON)).toBe(5)
  })
})

// Most missed question
describe("getMostMissedQuestion", () => {
  test("Empty submission list", () => {
    const JSON = []
    expect(getMostMissedQuestion(JSON)).toBe(-1)
  })

  test("One submission with missing questions list", () => {
    const JSON = [
      { }
    ]
    expect(getMostMissedQuestion(JSON)).toBe(-1)
  })

  test("One submission; empty questions list", () => {
    const JSON = [
      { "questions" : []}
    ]
    expect(getMostMissedQuestion(JSON)).toBe(-1)
  })

  test("One submission; one question", () => {
    const JSON = [{
      "questions": [{ "result": true }]
    }]
    expect(getMostMissedQuestion(JSON)).toBe(0)
  })

  test("Multiple submissions; one question", () => {
    const JSON = [
      { "questions": [{ "result": true }] },
      { "questions": [{ "result": false }] },
      { "questions": [{ "result": true }] },
    ]
    expect(getMostMissedQuestion(JSON)).toBe(0)
  })

  test("One submission; multiple questions", () => {
    const JSON = [{
      "questions": [
        { "result": true },
        { "result": true },
        { "result": false },
        { "result": true },
      ]
    }]
    expect(getMostMissedQuestion(JSON)).toBe(2)
  })

  test("Multiple submissions; multiple questions", () => {
    const JSON = [
      { "questions": [
          { "result": true },
          { "result": true },
          { "result": false },
          { "result": true },
      ]},
      { "questions": [
          { "result": true },
          { "result": false },
          { "result": false },
          { "result": true },
      ]},
      { "questions": [
          { "result": true },
          { "result": true },
          { "result": true },
          { "result": true },
      ]},
    ]
    expect(getMostMissedQuestion(JSON)).toBe(2)
  })

  test("Multiple submissions; multiple questions; first index", () => {
    const JSON = [
      { "questions": [
          { "result": false },
          { "result": true },
          { "result": false },
          { "result": true },
      ]},
      { "questions": [
          { "result": false },
          { "result": false },
          { "result": false },
          { "result": true },
      ]},
      { "questions": [
          { "result": false },
          { "result": true },
          { "result": true },
          { "result": true },
      ]},
    ]
    expect(getMostMissedQuestion(JSON)).toBe(0)
  })
})

// Average Score
describe("getAverageScore", () => {
  test("Empty submission list", () => {
    const JSON = []
    expect(getAverageScore(JSON)).toBe(0)
  })

  test("One submission", () => {
    const JSON = [
      { "score": 10 }
    ]
    expect(getAverageScore(JSON)).toBe(10)
  })

  test("More than one submission; integer result", () => {
    const JSON = [
      { "score": 5 },
      { "score": 15 }
    ]
    expect(getAverageScore(JSON)).toBe(10)
  })

  test("More than one submission; floating-point result", () => {
    const JSON = [
      { "score": 5 },
      { "score": 10 }
    ]
    expect(getAverageScore(JSON)).toBe(7.5)
  })
})

// Median Score
describe("getMedianScore", () => {
  test("Empty submission list", () => {
    const JSON = []
    expect(getMedianScore(JSON)).toBe(0)
  })

  test("One submission", () => {
    const JSON = [
      { "score": 10 }
    ]
    expect(getMedianScore(JSON)).toBe(10)
  })

  test("Two submissions", () => {
    const JSON = [
      { "score": 5 },
      { "score": 15 }
    ]
    expect(getMedianScore(JSON)).toBe(10)
  })

  test("Odd number of submissions greater than two", () => {
    const JSON = [
      { "score": 5 },
      { "score": 15 },
      { "score": 34 },
      { "score": 2 },
      { "score": 66 }
    ]
    expect(getMedianScore(JSON)).toBe(15)
  })

  test("Even number of submissions greater than two", () => {
    const JSON = [
      { "score": 5 },
      { "score": 15 },
      { "score": 34 },
      { "score": 2 },
      { "score": 66 },
      { "score": 100 }
    ]
    expect(getMedianScore(JSON)).toBe(24.5)
  })
})

// Highest Score
describe("getHighestScore", () => {
  test("Empty submission list", () => {
    const JSON = []
    expect(getHighestScore(JSON)).toBe(0)
  })

  test("One submission", () => {
    const JSON = [
      { "score": 10 }
    ]
    expect(getHighestScore(JSON)).toBe(10)
  })

  test("More than one submission", () => {
    const JSON = [
      { "score": 10 },
      { "score": 7 },
      { "score": 15 }
    ]
    expect(getHighestScore(JSON)).toBe(15)
  })
})

// Lowest Score
describe("getLowestScore", () => {
  test("Empty submission list", () => {
    const JSON = []
    expect(getLowestScore(JSON)).toBe(0)
  })

  test("One submission", () => {
    const JSON = [
      { "score": 10 }
    ]
    expect(getLowestScore(JSON)).toBe(10)
  })

  test("More than one submission", () => {
    const JSON = [
      { "score": 10 },
      { "score": 7 },
      { "score": 15 }
    ]
    expect(getLowestScore(JSON)).toBe(7)
  })
})

// Number Correct
describe("getNumberCorrect", () => {
  test("Empty submission list", () => {
    const JSON = []
    expect(getNumberCorrect(JSON)).toStrictEqual([])
  })

  test("One submission with missing questions list", () => {
    const JSON = [
      { }
    ]
    expect(getNumberCorrect(JSON)).toStrictEqual([])
  })

  test("One submission; empty questions list", () => {
    const JSON = [
      { "questions" : []}
    ]
    expect(getNumberCorrect(JSON)).toStrictEqual([])
  })

  test("One submission; one question; true result", () => {
    const JSON = [{
      "questions" : [
        {"result": true}
      ]
    }]
    expect(getNumberCorrect(JSON)).toStrictEqual([1])
  })

  test("One submission; one question; false result", () => {
    const JSON = [{
      "questions" : [
        {"result": false}
      ]
    }]
    expect(getNumberCorrect(JSON)).toStrictEqual([0])
  })

  test("Multiple submissions; one question", () => {
    const JSON = [
      { "questions" : [
        {"result": false}
      ] },
      { "questions" : [
        {"result": true}
      ] },
      { "questions" : [
        {"result": true}
      ] }
    ]
    expect(getNumberCorrect(JSON)).toStrictEqual([2])
  })

  test("One submission; multiple questions", () => {
    const JSON = [{
      "questions" : [
        {"result": true},
        {"result": false},
        {"result": true},
      ]
    }]
    expect(getNumberCorrect(JSON)).toStrictEqual([1, 0, 1])
  })

  test("Multiple submissions; multiple questions", () => {
    const JSON = [
      { "questions" : [
        {"result": true},
        {"result": true},
        {"result": true},
        {"result": true},
        {"result": false}
      ] },
      { "questions" : [
        {"result": true},
        {"result": false},
        {"result": true},
        {"result": false},
        {"result": false}
      ] },
      { "questions" : [
        {"result": true},
        {"result": true},
        {"result": false},
        {"result": false},
        {"result": false}
      ] }
    ]
    expect(getNumberCorrect(JSON)).toStrictEqual([3, 2, 2, 1, 0])
  })
})

// Answer Frequencies
describe("getAnswerFrequencies", () => {
  test("Empty submission list", () => {
    const JSON = []
    expect(getAnswerFrequencies(JSON, 0)).toBeNull()
  })

  test("One submission with missing questions list", () => {
    const JSON = [
      { }
    ]
    expect(getAnswerFrequencies(JSON, 0)).toBeNull()
  })

  test("One submission; empty questions list", () => {
    const JSON = [
      { "questions" : []}
    ]
    expect(getAnswerFrequencies(JSON, 0)).toBeNull()
  })
  
  test("One submission; one question", () => {
    const JSON = [{
      "questions" : [
        {"answer": "42"}
      ]
    }]

    var map = new Map()
    map.set("42", 1)
    expect(getAnswerFrequencies(JSON, 0)).toStrictEqual(map)
  })

  test("Multiple submissions; one question", () => {
    const JSON = [
      { "questions" : [
        {"answer": "42"}
      ] },
      { "questions" : [
        {"answer": "58"}
      ] },
      { "questions" : [
        {"answer": "42"}
      ] }
    ]

    var map = new Map()
    map.set("42", 2)
    map.set("58", 1)
    expect(getAnswerFrequencies(JSON, 0)).toStrictEqual(map)
  })

  test("One submission; multiple questions; index=0", () => {
    const JSON = [{
      "questions" : [
        {"answer": "42"},
        {"answer": "57"},
        {"answer": "24"},
      ]
    }]

    var map = new Map()
    map.set("42", 1)
    expect(getAnswerFrequencies(JSON, 0)).toStrictEqual(map)
  })

  test("One submission; multiple questions; index=len-1", () => {
    const JSON = [{
      "questions" : [
        {"answer": "42"},
        {"answer": "57"},
        {"answer": "24"},
      ]
    }]

    var map = new Map()
    map.set("24", 1)
    expect(getAnswerFrequencies(JSON, 2)).toStrictEqual(map)
  })

  test("One submission; multiple questions; index in middle", () => {
    const JSON = [{
      "questions" : [
        {"answer": "42"},
        {"answer": "57"},
        {"answer": "24"},
      ]
    }]

    var map = new Map()
    map.set("57", 1)
    expect(getAnswerFrequencies(JSON, 1)).toStrictEqual(map)
  })

  test("Multiple submissions; multiple questions; index=0", () => {
    const JSON = [
      { "questions" : [
        {"answer": "42"},
        {"answer": "69"},
        {"answer": "1"}
      ] },
      { "questions" : [
        {"answer": "58"},
        {"answer": "420"},
        {"answer": "1"}
      ] },
      { "questions" : [
        {"answer": "42"},
        {"answer": "doge"},
        {"answer": "1"}
      ] }
    ]

    var map = new Map()
    map.set("42", 2)
    map.set("58", 1)
    expect(getAnswerFrequencies(JSON, 0)).toStrictEqual(map)
  })

  test("Multiple submissions; multiple questions; index=len-1", () => {
    const JSON = [
      { "questions" : [
        {"answer": "42"},
        {"answer": "69"},
        {"answer": "1"}
      ] },
      { "questions" : [
        {"answer": "58"},
        {"answer": "420"},
        {"answer": "1"}
      ] },
      { "questions" : [
        {"answer": "42"},
        {"answer": "doge"},
        {"answer": "1"}
      ] }
    ]

    var map = new Map()
    map.set("1", 3)
    expect(getAnswerFrequencies(JSON, 2)).toStrictEqual(map)
  })

  test("Multiple submissions; multiple questions; index in middle", () => {
    const JSON = [
      { "questions" : [
        {"answer": "42"},
        {"answer": "69"},
        {"answer": "1"}
      ] },
      { "questions" : [
        {"answer": "58"},
        {"answer": "420"},
        {"answer": "1"}
      ] },
      { "questions" : [
        {"answer": "42"},
        {"answer": "doge"},
        {"answer": "1"}
      ] }
    ]

    var map = new Map()
    map.set("69", 1)
    map.set("420", 1)
    map.set("doge", 1)
    expect(getAnswerFrequencies(JSON, 1)).toStrictEqual(map)
  })
})