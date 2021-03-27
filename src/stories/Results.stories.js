import React from 'react';
import mockSubmission from '../mocks/submission.mock.json'

import Results from '../components/Results';

const storyMetaData = {
  title: 'Results',
  component: Results,
};
export default storyMetaData;

const Template = (args) => <Results {...args} />;

export const GradedResults = Template.bind({});
GradedResults.args = {
  submission: mockSubmission
};

export const HiddenAnswersResults = Template.bind({});
HiddenAnswersResults.args = {
  submission: mockSubmission,
  hideAnswers: true
};
