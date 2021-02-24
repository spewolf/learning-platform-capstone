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
  content: mockPractice.questions[0].content,
  onCheck: () => { alert(response); },
  onNext: () => { alert("Next"); },
  onChange: (event) => {response = event.target.value;},
}

export const BinaryToDecimal = Template.bind({});
BinaryToDecimal.args = {
  content: mockPractice.questions[1].content,
  onCheck: () => { alert(response); },
  onNext: () => { alert("Next"); },
  onChange: (event) => {response = event.target.value;},
}

export const BinaryAddition = Template.bind({});
BinaryAddition.args = {
  content: mockPractice.questions[2].content,
  onCheck: () => { alert(response); },
  onNext: () => { alert("Next"); },
  onChange: (event) => {response = event.target.value;},
}

export const BinarySubtraction = Template.bind({});
BinarySubtraction.args = {
  content: mockPractice.questions[4].content,
  onCheck: () => { alert(response); },
  onNext: () => { alert("Next"); },
  onChange: (event) => {response = event.target.value;},
}