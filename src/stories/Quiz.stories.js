import React from 'react';

import Quiz from '../components/Quiz';

const storyMetaData = {
  title: 'Quiz',
  component: Quiz,
};
export default storyMetaData;

const Template = (args) => <Quiz {...args} />;

export const BasicQuiz = Template.bind({});
BasicQuiz.args = {};
