import React from 'react';
import Question from '../components/Question';

// only for testing/demoing
const mockPractice = require('../mocks/practiceAssignment.mock.json');

let response = ""; 

const MockQuizMetaData = {
  title: "Mock Quiz",
  component: Question,
};
export default MockQuizMetaData;

const Template = (args) => <Question {...args} />

export const DecimalToBinary = Template.bind({});
DecimalToBinary.args = {
  question: mockPractice.questions[0],
  onCheck: () => { alert(response); },
  onNext: () => { alert("Next"); },
  onChange: (event) => {response = event.target.value;},
}

export const BinaryToDecimal = Template.bind({});
BinaryToDecimal.args = {
  question: mockPractice.questions[1],
  onCheck: () => { alert(response); },
  onNext: () => { alert("Next"); },
  onChange: (event) => {response = event.target.value;},
}

export const BinaryAddition = Template.bind({});
BinaryAddition.args = {
  question: mockPractice.questions[2],
  onCheck: () => { alert(response); },
  onNext: () => { alert("Next"); },
  onChange: (event) => {response = event.target.value;},
}

export const BinarySubtraction = Template.bind({});
BinarySubtraction.args = {
  question: mockPractice.questions[4],
  onCheck: () => { alert(response); },
  onNext: () => { alert("Next"); },
  onChange: (event) => {response = event.target.value;},
}