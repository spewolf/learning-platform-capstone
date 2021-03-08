import React from 'react';
import practiceAssignment from '../mocks/practiceAssignment.mock.json';
import gradedAssignment from '../mocks/gradedAssignment.mock.json';

import Quiz from '../components/Quiz';

const storyMetaData = {
  title: 'Quiz',
  component: Quiz,
};
export default storyMetaData;

const Template = (args) => <Quiz {...args} />;

export const PracticeQuiz = Template.bind({});
PracticeQuiz.args = {
  assignment: practiceAssignment
};

export const GradedQuiz = Template.bind({});
GradedQuiz.args = {
  assignment: gradedAssignment,
  handleSubmission: s => console.log(s)
};
