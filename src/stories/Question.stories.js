import React from 'react';
import mockAssignment from '../mocks/practiceAssignment.mock.json';
import gradedAssignment from '../mocks/gradedAssignment.mock.json';

import Question from '../components/Question';

const storyMetaData = {
  title: 'Question',
  component: Question,
};
export default storyMetaData;

const Template = (args) => <Question {...args} />;

export const PracticeQuestion = Template.bind({});
PracticeQuestion.args = {
  question: mockAssignment.questions[0],
  onChange: (e) => console.log(e.target.value),
  onCheck: () => console.log("Checking"),
  onNext: () => console.log("Nexting"),
};

export const GradedQuestion = Template.bind({});
GradedQuestion.args = {
  question: gradedAssignment.questions[0]
}

export const CorrectPracticeQuestion = Template.bind({});
CorrectPracticeQuestion.args = {
  question: mockAssignment.questions[0],
  onChange: (e) => console.log(e.target.value),
  onCheck: () => console.log("Checking"),
  onNext: () => console.log("Nexting"),
  result: true,
};

export const IncorrectPracticeQuestion = Template.bind({});
IncorrectPracticeQuestion.args = {
  question: mockAssignment.questions[0],
  onChange: (e) => console.log(e.target.value),
  onCheck: () => console.log("Checking"),
  onNext: () => console.log("Nexting"),
  result: false,
};
