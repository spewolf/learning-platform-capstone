import React from 'react';

import LearnBinaryToDecimal from '../components/LearnBinaryToDecimal';

const storyMetaData = {
  title: 'Learning Module - Bin To Dec',
  component: LearnBinaryToDecimal,
};
export default storyMetaData;

const Template = (args) => <LearnBinaryToDecimal {...args} />;

export const Module = Template.bind({});
Module.args = {};
