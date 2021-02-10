import React from 'react';
import RadioButtonsGroup from './Radio';
import TextEntryBox from './TextEntryBox';
import { Container, Paper } from '@material-ui/core';

export default class QuizExample extends React.Component {
  render() {
    return (
      <div>
        <Container style={{backgroundColor: '#ffffff', height: '100vh'}}>
          <Paper elevation={3}>
            <RadioButtonsGroup />
            <TextEntryBox />
          </Paper>
        </Container>
      </div>
    );
  }
}