import {
  getTotalAssignmentPoints,
  getMostMissedQuestion,
  getAverageScore,
  getMedianScore,
  getHighestScore,
  getLowestScore
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