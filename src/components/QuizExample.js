import React from 'react';
import RadioButtonsGroup from './Radio';
import TextEntryBox from './TextEntryBox';
import { Container, Paper } from '@material-ui/core';
import SelectTextBox from './SelectTextBoxes';

export default class QuizExample extends React.Component {
  render() {
    return (
      <div>
        <Container style={{backgroundColor: '#ffffff', height: '100vh'}}>
          <Paper elevation={3}>
            <RadioButtonsGroup options={["1", "3", "5", "7"]} correct="ans2" content="What is 10 / 2?" />
            <TextEntryBox correct="0100" content="What is decimal 4 in binary?" />
            <SelectTextBox content="Pick the third answer" correct="ans2" options={["first", "second", "third", "fourth"]} />
          </Paper>
        </Container>
      </div>
    );
  }
}